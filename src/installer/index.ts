import fs from 'fs'
import path from 'path'
import pkgDir from 'pkg-dir'
import getConf from '../getConf'
import getScript from './getScript'
import { isGhooks, isHusky, isPreCommit, isYorkie } from './is'
import debug from '../debug'

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
  // INIT_CWD holds the full path you were in when you ran npm install (supported also by yarn and pnpm)
  // See https://docs.npmjs.com/cli/run-script
  if (process.env.INIT_CWD) {
    return process.env.INIT_CWD.indexOf('node_modules') !== -1
  }

  // Old technique
  return (dir.match(/node_modules/g) || []).length > 1
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

/**
 * @param topLevel - as returned by git --rev-parse
 * @param gitDir - as returned by git --rev-parse
 * @param huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param isCI - true if running in CI
 * @param requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/run-node/run-node
 */
// eslint-disable-next-line max-params
export function install(
  topLevel: string,
  gitDir: string,
  huskyDir: string,
  isCI: boolean,
  requireRunNodePath = require.resolve('run-node/run-node')
): void {
  // First directory containing user's package.json
  const userPkgDir = pkgDir.sync(path.join(huskyDir, '..'))

  if (userPkgDir === undefined) {
    console.log("Can't find package.json, skipping Git hooks installation.")
    console.log(
      'Please check that your project has a package.json or create it and reinstall husky.'
    )
    return
  }

  // Get conf from package.json or .huskyrc
  const conf = getConf(userPkgDir)

  // Checks
  if (isCI && conf.skipCI) {
    console.log('CI detected, skipping Git hooks installation.')
    return
  }

  if (isInNodeModules(huskyDir)) {
    console.log(
      'Trying to install from node_modules directory, skipping Git hooks installation.'
    )
    return
  }

  // Create hooks directory if it doesn't exist
  const gitHooksDir = getGitHooksDir(gitDir)
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir)
  }

  debug(`Installing hooks in '${gitHooksDir}'`)
  const hooks = getHooks(gitDir)
  const script = getScript(topLevel, huskyDir, requireRunNodePath)
  createHooks(hooks, script)
}

export function uninstall(gitDir: string, huskyDir: string): void {
  if (gitDir === null) {
    console.log(
      "Can't find resolved .git directory, skipping Git hooks uninstallation."
    )
    return
  }

  if (isInNodeModules(huskyDir)) {
    console.log(
      'Trying to uninstall from node_modules directory, skipping Git hooks uninstallation.'
    )
    return
  }

  // Remove hooks
  const hooks = getHooks(gitDir)
  removeHooks(hooks)
}
