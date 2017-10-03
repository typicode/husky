import * as fs from 'fs'
import isCI from 'is-ci'
import * as path from 'path'
import * as pkgDir from 'pkg-dir'
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

function getUserDir(rootDir: string): string {
  return pkgDir.sync(path.join(rootDir, '..'))
}

function checkCI() {
  if (isCI) {
    throw new HuskyError('CI detected, skipping Git hooks installation"')
  }
}

function checkUserDir(userDir: string) {
  if (!fs.existsSync(userDir)) {
    throw new HuskyError("Error: Can't find package.json")
  }
}

function checkGitDir(userDir: string) {
  if (!fs.existsSync(path.join(userDir, '.git/hooks'))) {
    throw new HuskyError(`Error: Can't find .git directory in ${userDir}`)
  }
}

function checkGitHooksDir(userDir: string) {
  if (!fs.existsSync(path.join(userDir, '.git/hooks'))) {
    throw new HuskyError(`Error: Can't find .git/hooks directory in ${userDir}`)
  }
}

export function install(rootDir: string) {
  try {
    console.log('husky > setting up git hooks')
    const userDir = getUserDir(rootDir)

    // Checks
    checkCI()
    checkUserDir(userDir)
    checkGitDir(userDir)
    checkGitHooksDir(userDir)

    // Create hooks
    const hooks = getHooks(userDir)
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

export function uninstall(rootDir: string) {
  try {
    console.log('husky > uninstalling git hooks')
    const userDir = getUserDir(rootDir)

    // Checks
    checkUserDir(userDir)
    checkGitDir(userDir)
    checkGitHooksDir(userDir)

    // Remove hooks
    const hooks = getHooks(userDir)
    removeHooks(hooks)
  } catch (e) {
    // Ignore husky errors
    if (!(e instanceof HuskyError)) {
      console.log(e)
    }
  }

  console.log('husky > done')
}
