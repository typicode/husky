import * as fs from 'fs'
import * as path from 'path'
import * as pkgDir from 'pkg-dir'
import * as readPkg from 'read-pkg'
import getConf from '../getConf'
import getScript from './getScript'
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

function writeHook(filename: string, script: string) {
  fs.writeFileSync(filename, script, 'utf-8')
  fs.chmodSync(filename, parseInt('0755', 8))
}

function createHook(filename: string, script: string) {
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
    if (isHusky(hook)) {
      return writeHook(filename, script)
    }

    // Skip
    console.log(`skipping existing user hook: ${name}`)
    return
  }

  // Create hook if it doesn't exist
  writeHook(filename, script)
}

function createHooks(filenames: string[], script: string) {
  filenames.forEach(filename => createHook(filename, script))
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

// This prevents the case where someone would want to debug a node_module that has
// husky as devDependency and run npm install from node_modules directory
function isInNodeModules(dir: string) {
  // INIT_CWD holds the full path you were in when you ran npm install (supported also by yarn and pnpm)
  // See https://docs.npmjs.com/cli/run-script
  if (
    process.env.INIT_CWD &&
    process.env.INIT_CWD.indexOf('node_modules') !== -1
  ) {
    return true
  }

  // Old technique
  return (dir.match(/node_modules/g) || []).length > 1
}

function getHooks(gitDir: string): string[] {
  const gitHooksDir = path.join(gitDir, 'hooks')
  return hookList.map(hookName => path.join(gitHooksDir, hookName))
}

/**
 * @param gitDir - e.g. /home/typicode/project/.git/
 * @param huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param isCI - true if running in CI
 */
export function install(
  gitDir: string,
  huskyDir: string,
  requireRunNodePath: string = require.resolve('.bin/run-node'),
  isCI: boolean
) {
  console.log('husky > setting up git hooks')

  // Git repo root directory e.g. /home/typicode/project/
  const rootDir = path.join(gitDir, '..')
  // First directory containing user's package.json
  const userPkgDir = pkgDir.sync(path.join(huskyDir, '..'))
  // Get conf from package.json or .huskyrc
  const conf = getConf(userPkgDir)

  // Checks
  if (process.env.HUSKY_SKIP_INSTALL === 'true') {
    console.log(
      "HUSKY_SKIP_INSTALL environment variable is set to 'true',",
      'skipping Git hooks installation.'
    )
    return
  }

  if (isCI && conf.skipCI) {
    console.log('CI detected, skipping Git hooks installation.')
    return
  }

  if (userPkgDir === null) {
    console.log("Can't find package.json, skipping Git hooks installation.")
    return
  }

  if (isInNodeModules(huskyDir)) {
    console.log(
      'Trying to install from node_modules directory, skipping Git hooks installation.'
    )
    return
  }

  if (!fs.existsSync(path.join(rootDir, '.git/hooks'))) {
    console.log(
      "Can't find .git/hooks directory. You can try to fix this error by creating it manually."
    )
    console.log('Skipping Git hooks installation.')
    return
  }

  // Create hooks
  const hooks = getHooks(gitDir)
  const script = getScript(rootDir, huskyDir, requireRunNodePath)
  createHooks(hooks, script)

  console.log(`husky > done`)
}

export function uninstall(gitDir: string, huskyDir: string) {
  console.log('husky > uninstalling git hooks')
  const userDir = pkgDir.sync(path.join(huskyDir, '..'))

  if (isInNodeModules(huskyDir)) {
    console.log(
      'Trying to uninstall from node_modules directory, skipping Git hooks uninstallation.'
    )
    return
  }

  // Remove hooks
  const hooks = getHooks(gitDir)
  removeHooks(hooks)

  console.log('husky > done')
}
