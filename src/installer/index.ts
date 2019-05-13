import findUp from 'find-up'
import fs from 'fs'
import path from 'path'
import pkgDir from 'pkg-dir'
import getConf from '../getConf'
import getScript from './getScript'
import { isGhooks, isHusky, isPreCommit, isYorkie } from './is'
import resolveGitDir from './resolveGitDir'

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

function getHooks(gitDir: string): string[] {
  const gitHooksDir = path.join(gitDir, 'hooks')
  return hookList.map(
    (hookName: string): string => path.join(gitHooksDir, hookName)
  )
}

/**
 * @param {string} huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param {string} requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param {string} isCI - true if running in CI
 */
export function install(
  huskyDir: string,
  requireRunNodePath: string = require.resolve('.bin/run-node'),
  isCI: boolean
): void {
  console.log('husky > Setting up git hooks')

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
  // Get directory containing .git directory or in the case of Git submodules, the .git file
  const gitDirOrFile = findUp.sync('.git', { cwd: userPkgDir })
  // Resolve git directory (e.g. .git/ or .git/modules/path/to/submodule)
  const resolvedGitDir = resolveGitDir(userPkgDir)

  // Checks
  if (process.env.HUSKY_SKIP_INSTALL === 'true') {
    console.log(
      "HUSKY_SKIP_INSTALL environment variable is set to 'true',",
      'skipping Git hooks installation.'
    )
    return
  }

  if (gitDirOrFile === null) {
    console.log("Can't find .git, skipping Git hooks installation.")
    console.log(
      "Please check that you're in a cloned repository",
      "or run 'git init' to create an empty Git repository and reinstall husky."
    )
    return
  }

  if (resolvedGitDir === null) {
    console.log(
      "Can't find resolved .git directory, skipping Git hooks installation."
    )
    return
  }

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

  // Create hooks directory if doesn't exist
  if (!fs.existsSync(path.join(resolvedGitDir, 'hooks'))) {
    fs.mkdirSync(path.join(resolvedGitDir, 'hooks'))
  }

  // Create hooks
  // Get root dir based on the first .git directory of file found
  const rootDir = path.dirname(gitDirOrFile)

  const hooks = getHooks(resolvedGitDir)
  const script = getScript(rootDir, huskyDir, requireRunNodePath)
  createHooks(hooks, script)

  console.log(`husky > Done`)
  console.log('husky > Like husky? You can support the project on Patreon:')
  console.log(
    'husky > \x1b[4;36m%s\x1b[0m ❤',
    'https://www.patreon.com/typicode'
  )
}

export function uninstall(huskyDir: string): void {
  console.log('husky > Uninstalling git hooks')
  const userPkgDir = pkgDir.sync(path.join(huskyDir, '..'))
  const resolvedGitDir = resolveGitDir(userPkgDir)

  if (resolvedGitDir === null) {
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
  const hooks = getHooks(resolvedGitDir)
  removeHooks(hooks)

  console.log('husky > Done')
}
