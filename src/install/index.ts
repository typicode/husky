import * as fs from 'fs'
import isCI from 'is-ci'
import * as path from 'path'
import * as pkgDir from 'pkg-dir'
import readPkg from 'read-pkg'
import hookScript from './hookScript'
import { isGhooks, isHusky, isPreCommit } from './is'

const hookList = [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-receive',
  'update',
  'post-receive',
  'post-update',
  'push-to-checkout',
  'pre-auto-gc',
  'post-rewrite',
  'sendemail-validate'
]

function writeHook(filename: string) {
  fs.writeFileSync(filename, hookScript, 'utf-8')
  fs.chmodSync(filename, parseInt('0755', 8))
}

function createHook(filename: string) {
  // Get name, used for logging
  const name = path.basename(filename)

  // Check if hook exist
  if (fs.existsSync(filename)) {
    const hook = fs.readFileSync(filename, 'utf-8')

    // Migrate
    if (isGhooks(hook)) {
      console.log(`migrating existing ghooks script: ${name} `)
      return writeHook(filename)
    }

    // Migrate
    if (isPreCommit(hook)) {
      console.log(`migrating existing pre-commit script: ${name}`)
      return writeHook(filename)
    }

    // Update
    if (isHusky(hook)) {
      return writeHook(filename)
    }

    // Skip
    console.log(`skipping existing user hook: ${name}`)
    return
  }

  // Create hook if it doesn't exist
  writeHook(filename)
}

function createHooks(filenames: string[]) {
  filenames.forEach(createHook)
}

function canRemove(filename: string): boolean {
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename, 'utf-8')
    return isHusky(data)
  }

  return false
}

function removeHook(filename: string) {
  fs.unlinkSync(filename)
}

function removeHooks(filenames: string[]) {
  filenames.filter(canRemove).forEach(removeHook)
}

export class HuskyError extends Error {}

function getHooks(userDir: string): string[] {
  const gitHooksDir = path.join(userDir, '.git/hooks')
  return hookList.map(hookName => path.join(gitHooksDir, hookName))
}

function getGitDir(huskyModuleDir: string) {
  const nodeModulesDir = path.join(huskyModuleDir, '..')

  // Search user's package.json starting from node_modules directory
  // Should support pnpm directory hierarchy
  const userPackageDir: string = pkgDir.sync(nodeModulesDir)
  return path.join(userPackageDir, '.git')
}

function getPkgDir(rootDir: string): string {
  return pkgDir.sync(path.join(rootDir, '..'))
}

function checkCI() {
  if (isCI) {
    throw new HuskyError('CI detected, skipping Git hooks installation"')
  }
}

function checkPkgDir(packageDir: string | null) {
  if (packageDir === null) {
    throw new HuskyError("Error: Can't find package.json")
  }
}

function checkGitHooksDir(gitDir: string) {
  // TODO mkdirp?
  if (!fs.existsSync(path.join(gitDir, 'hooks'))) {
    throw new HuskyError(`Error: Can't find .git/hooks directory in ${gitDir}`)
  }
}

function checkGitDirHasPackage(gitDir: string, packageDir: string) {
  if (packageDir !== gitDir) {
    throw new HuskyError(
      `Error: expecting package.json to be at the same level than .git`
    )
  }
}

function getConf(huskyDir: string) {
  const pkg = readPkg.sync(huskyDir)

  const defaults = {
    skipCI: true
  }

  return { defaults, ...pkg.husky }
}

export function install(gitDir: string, huskyDir: string) {
  try {
    console.log('husky > setting up git hooks')
    const userDir = getPkgDir(huskyDir)
    const conf = getConf(userDir)

    // Checks
    if (!conf.skipCI) {
      checkCI()
    }
    checkPkgDir(userDir)
    checkGitDirHasPackage(gitDir, userDir)
    checkGitHooksDir(gitDir)

    // Create hooks
    const hooks = getHooks(gitDir)
    createHooks(hooks)
  } catch (e) {
    if (e instanceof HuskyError) {
      console.log(e.message)
    } else {
      throw e
    }
  }

  console.log(`husky > done`)
}

export function uninstall(gitDir: string, huskyDir: string) {
  try {
    console.log('husky > uninstalling git hooks')
    const packageDir = getPkgDir(huskyDir)

    // Checks
    checkGitDirHasPackage(packageDir, gitDir)
    checkGitHooksDir(packageDir)

    // Remove hooks
    const hooks = getHooks(packageDir)
    removeHooks(hooks)
  } catch (e) {
    // Ignore husky errors
    if (!(e instanceof HuskyError)) {
      console.log(e)
    }
  }

  console.log('husky > done')
}
