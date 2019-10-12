import chalk from 'chalk'
import { isCI } from 'ci-info'
import path from 'path'
import debug from '../debug'
import { install, uninstall } from './'
import gitRevParse from './gitRevParse'
import { checkGitDirEnv } from '../checkGitDirEnv'

// Debug
debug(`Current working directory is '${process.cwd()}'`)
debug(`INIT_CWD environment variable is set to '${process.env.INIT_CWD}'`)

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

  // Check GIT_DIR environment variable
  checkGitDirEnv()

  // Get top level and git dir
  const { topLevel, gitCommonDir } = gitRevParse()

  debug('Git rev-parse command returned:')
  debug(`  --show-top-level: ${topLevel}`)
  debug(`  --git-common-dir: ${gitCommonDir}`)

  // Install or uninstall
  if (action === 'install') {
    install(topLevel, gitCommonDir, huskyDir, isCI)
  } else {
    uninstall(gitCommonDir, huskyDir)
  }

  console.log(`husky > Done`)
} catch (error) {
  console.log(chalk.red(error.message.trim()))
  console.log(chalk.red(`husky > Failed to ${action}`))
}
