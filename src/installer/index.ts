import * as findUp from 'find-up'
import * as fs from 'fs'
import * as path from 'path'
import * as pkgDir from 'pkg-dir'
import getConf, { IConfInstallType } from '../getConf'
import getAppendScript, { remove } from './getAppendScript'
import getScript from './getScript'
import { isGhooks, isHusky, isHuskyAppend, isPreCommit, isYorkie } from './is'
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

export function writeHook(filename: string, script: string) {
  fs.writeFileSync(filename, script, 'utf-8')
  fs.chmodSync(filename, parseInt('0755', 8))
}

interface IOptions {
  installType: IConfInstallType
  rootDir: string
  requireRunNodePath: string
  huskyDir: string
}

export function getUserStagedFilename(filename: string): string {
  return filename + '.husky-user'
}

function createHook(
  filename: string,
  script: string,
  { installType = 'skip', rootDir, huskyDir, requireRunNodePath }: IOptions
) {
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

    const newUserhookFilename = getUserStagedFilename(filename)
    // Exists previous one
    if (isHuskyAppend(hook)) {
      if (fs.existsSync(newUserhookFilename)) {
        // Reset
        fs.renameSync(newUserhookFilename, filename)
      }
    }

    // Exists user hooks
    if ('overwrite' === installType) {
      // Renames user hook
      fs.renameSync(filename, newUserhookFilename)
      console.log(`overwriting existing user hook: ${name}`)
      return writeHook(filename, script)
    } else if ('append' === installType) {
      // Renames user hook
      fs.renameSync(filename, newUserhookFilename)

      const appendScript = getAppendScript(
        rootDir,
        huskyDir,
        requireRunNodePath
      )
      const content = appendScript + '\n' + script
      console.log(`appending existing user hook: ${name}`)
      return writeHook(filename, content)
    }

    // Removes appended
    const removedScript = remove(hook)
    if (script !== removedScript) {
      writeHook(filename, removedScript)
    }
    // Skip
    console.log(`skipping existing user hook: ${name}`)
    return
  }

  // Create hook if it doesn't exist
  writeHook(filename, script)
}

function createHooks(filenames: string[], script: string, options: IOptions) {
  filenames.forEach(filename => createHook(filename, script, options))
}

function removeHook(filename: string) {
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename, 'utf-8')

    if (isHusky(data) || isHuskyAppend(data)) {
      fs.unlinkSync(filename)
    }

    const newUserHookFilename = getUserStagedFilename(filename)
    if (fs.existsSync(newUserHookFilename)) {
      // Reset
      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename)
      }
      fs.renameSync(newUserHookFilename, filename)
    }
  }
}

function removeHooks(filenames: string[]) {
  filenames.forEach(removeHook)
}

// This prevents the case where someone would want to debug a node_module that has
// husky as devDependency and run npm install from node_modules directory
function isInNodeModules(dir: string) {
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
  return hookList.map(hookName => path.join(gitHooksDir, hookName))
}

/**
 * @param huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param isCI - true if running in CI
 */
export function install(
  huskyDir: string,
  requireRunNodePath: string = require.resolve('.bin/run-node'),
  isCI: boolean
) {
  console.log('husky > setting up git hooks')

  // First directory containing user's package.json
  const userPkgDir = pkgDir.sync(path.join(huskyDir, '..'))
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

  if (userPkgDir === null) {
    console.log("Can't find package.json, skipping Git hooks installation.")
    console.log(
      'Please check that your project has a package.json or create it and reinstall husky.'
    )
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
  createHooks(hooks, script, {
    huskyDir,
    installType: conf.installType,
    requireRunNodePath,
    rootDir
  })

  console.log(`husky > done`)
}

export function uninstall(huskyDir: string) {
  console.log('husky > uninstalling git hooks')
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

  console.log('husky > done')
}
