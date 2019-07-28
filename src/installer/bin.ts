import chalk from 'chalk'
import isCI from 'is-ci'
import path from 'path'
import whichPMRuns from 'which-pm-runs'
import debug from '../debug'
import { install, uninstall } from './'
import gitRevParse from './gitRevParse'

// Debug
debug(`cwd: ${process.cwd()}`)

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
try {
  // Show un/install message
  console.log(
    'husky > %s git hooks',
    action === 'install' ? 'Setting up' : 'Uninstalling'
  )

  // Get top level and git dir
  const { topLevel, absoluteGitDir } = gitRevParse()

  // Debug
  debug(`topLevel: ${topLevel}`)
  debug(`gitDir: ${absoluteGitDir}`)

  // Install or uninstall
  if (action === 'install') {
    const pm = whichPMRuns()
    debug(`package manager: ${pm.name}`)
    install(absoluteGitDir, huskyDir, pm.name, isCI)
  } else {
    uninstall(absoluteGitDir, huskyDir)
  }
} catch (error) {
  console.log(chalk.red(error.message.trim()))
  console.log(chalk.red(`husky > Failed to ${action}`))
}
