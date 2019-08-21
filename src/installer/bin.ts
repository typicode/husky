import chalk from 'chalk'
import isCI from 'is-ci'
import path from 'path'
import debug from '../debug'
import { install, uninstall } from './'
import gitRevParse from './gitRevParse'

// Debug
debug(`cwd: ${process.cwd()}`)
debug(`INIT_CWD: ${process.env.INIT_CWD}`)

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

  // Skip install if HUSKY_SKIP_INSTALL=1
  if (
    action === 'install' &&
    ['1', 'true'].includes(process.env.HUSKY_SKIP_INSTALL || '')
  ) {
    console.log(
      "HUSKY_SKIP_INSTALL environment variable is set to 'true',",
      'skipping Git hooks installation.'
    )
    process.exit(0)
  }

  // Get top level and git dir
  const { topLevel, absoluteGitDir } = gitRevParse()

  // Debug
  debug(`topLevel: ${topLevel}`)
  debug(`gitDir: ${absoluteGitDir}`)

  // Install or uninstall
  if (action === 'install') {
    install(topLevel, absoluteGitDir, huskyDir, isCI)
  } else {
    uninstall(absoluteGitDir, huskyDir)
  }

  console.log(`husky > Done`)
} catch (error) {
  console.log(chalk.red(error.message.trim()))
  console.log(chalk.red(`husky > Failed to ${action}`))
}
