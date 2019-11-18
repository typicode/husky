import fs from 'fs'
import path from 'path'
import { debug } from '../debug'
import getConf from '../getConf'
import getScript from './getScript'
import { isGhooks, isHusky, isPreCommit, isYorkie } from './is'

const hookList = [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'pre-merge-commit',
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

function writeHook(filename: string, script: string): void {
  fs.writeFileSync(filename, script, 'utf-8')
  fs.chmodSync(filename, 0o0755)
}

function createHook(filename: string, script: string): void {
  // Get name, used for logging
  const name = path.basename(filename)

  // Check if hook exist
  if (fs.existsSync(filename)) {
    const hook = fs.readFileSync(filename, 'utf-8')

    // Migrate
    if (isGhooks(hook)) {
      console.log(`migrating existing ghooks script: ${name}`)
      return writeHook(filename, script)
    }

    // Migrate
    if (isPreCommit(hook)) {
      console.log(`migrating existing pre-commit script: ${name}`)
      return writeHook(filename, script)
    }

    // Update
    if (isHusky(hook) || isYorkie(hook)) {
      return writeHook(filename, script)
    }

    // Skip
    console.log(`skipping existing user hook: ${name}`)
    return
  }

  // Create hook if it doesn't exist
  writeHook(filename, script)
}

function createHooks(filenames: string[], script: string): void {
  filenames.forEach((filename: string): void => createHook(filename, script))
}

function canRemove(filename: string): boolean {
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename, 'utf-8')
    return isHusky(data)
  }

  return false
}

function removeHook(filename: string): void {
  fs.unlinkSync(filename)
}

function removeHooks(filenames: string[]): void {
  filenames.filter(canRemove).forEach(removeHook)
}

// This prevents the case where someone would want to debug a node_module that has
// husky as devDependency and run npm install from node_modules directory
function isInNodeModules(dir: string): boolean {
  return dir.indexOf('node_modules') !== -1
}

function getGitHooksDir(gitDir: string): string {
  return path.join(gitDir, 'hooks')
}

function getHooks(gitDir: string): string[] {
  const gitHooksDir = getGitHooksDir(gitDir)
  return hookList.map((hookName: string): string =>
    path.join(gitHooksDir, hookName)
  )
}

export function install({
  absoluteGitCommonDir,
  relativeUserPkgDir,
  userPkgDir,
  pmName, // package manager name
  isCI // running in CI or not
}: {
  absoluteGitCommonDir: string
  relativeUserPkgDir: string
  userPkgDir: string
  pmName: string
  isCI: boolean
}): void {
  // Get conf from package.json or .huskyrc
  const conf = getConf(userPkgDir)

  // Checks
  if (isCI && conf.skipCI) {
    console.log('CI detected, skipping Git hooks installation.')
    return
  }

  if (isInNodeModules(userPkgDir)) {
    console.log(
      'Trying to install from node_modules directory, skipping Git hooks installation.'
    )
    return
  }

  // Create hooks directory if it doesn't exist
  const gitHooksDir = getGitHooksDir(absoluteGitCommonDir)
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir)
  }

  debug(`Installing hooks in ${gitHooksDir}`)
  const hooks = getHooks(absoluteGitCommonDir)

  // Prefix can be an empty string
  const script = getScript({ relativeUserPkgDir, pmName })
  createHooks(hooks, script)
}

export function uninstall({
  absoluteGitCommonDir,
  userPkgDir
}: {
  absoluteGitCommonDir: string
  userPkgDir: string
}): void {
  if (isInNodeModules(userPkgDir)) {
    console.log(
      'Trying to uninstall from node_modules directory, skipping Git hooks uninstallation.'
    )
    return
  }

  // Remove hooks
  const hooks = getHooks(absoluteGitCommonDir)
  removeHooks(hooks)
}
