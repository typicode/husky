import fs from 'fs'
import path from 'path'
import { debug } from '../debug'
import { getConf } from '../getConf'
import { createHooks, removeHooks } from './hooks'
import { createLocalScript, removeLocalScript } from './localScript'
import { createMainScript, removeMainScript } from './mainScript'

// This prevents the case where someone would want to debug a node_module that has
// husky as devDependency and run npm install from node_modules directory
function isInNodeModules(dir: string): boolean {
  return dir.indexOf('node_modules') !== -1
}

function getGitHooksDir(gitDir: string): string {
  return path.join(gitDir, 'hooks')
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
  createHooks(gitHooksDir)
  createLocalScript(gitHooksDir, pmName, relativeUserPkgDir)
  createMainScript(gitHooksDir)
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
  const gitHooksDir = getGitHooksDir(absoluteGitCommonDir)
  removeHooks(gitHooksDir)
  removeLocalScript(gitHooksDir)
  removeMainScript(gitHooksDir)
}
