import fs from 'fs'
import path from 'path'
import { debug } from '../debug'
import { getConf } from '../getConf'
import { createHooks, removeHooks } from './hooks'
import { createLocalScript, removeLocalScript } from './localScript'
import { createMainScript, removeMainScript } from './mainScript'

function getGitHooksDir(gitDir: string): string {
  return path.join(gitDir, 'hooks')
}

export function install({
  absoluteGitCommonDir,
  relativeUserPkgDir,
  userPkgDir,
  pmName, // package manager name
  isCI, // running in CI or not
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

export function uninstall(absoluteGitCommonDir: string): void {
  // Remove hooks
  const gitHooksDir = getGitHooksDir(absoluteGitCommonDir)
  removeHooks(gitHooksDir)
  removeLocalScript(gitHooksDir)
  removeMainScript(gitHooksDir)
}
