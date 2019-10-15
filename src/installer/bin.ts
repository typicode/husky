import chalk from 'chalk'
import { isCI } from 'ci-info'
import whichPMRuns from 'which-pm-runs'
import { checkGitDirEnv } from '../checkGitDirEnv'
import { debug } from '../debug'
import { install, uninstall } from './'
import { GitMeta, gitRevParse } from './gitRevParse'

// Skip install if HUSKY_SKIP_INSTALL is true
function checkSkipInstallEnv(): void {
  if (['1', 'true'].includes(process.env.HUSKY_SKIP_INSTALL || '')) {
    console.log(
      'HUSKY_SKIP_INSTALL is set to true,',
      'skipping Git hooks installation.'
    )
    process.exit(0)
  }
}

function getGitMeta(): GitMeta {
  const { topLevel, gitCommonDir } = gitRevParse()

  debug('Git rev-parse command returned:')
  debug(`  --show-top-level: ${topLevel}`)
  debug(`  --git-common-dir: ${gitCommonDir}`)

  return { topLevel, gitCommonDir }
}

// Get INIT_CWD env variable
function getInitCwdEnv(): string {
  const { INIT_CWD } = process.env

  if (INIT_CWD === undefined) {
    const { name, version } = whichPMRuns()
    throw new Error(
      `INIT_CWD is not set, please upgrade your package manager (${name} ${version})`
    )
  }

  debug(`INIT_CWD is set to ${INIT_CWD}`)

  return INIT_CWD
}

function run(): void {
  debug(`Current working directory is ${process.cwd()}`)
  debug(`INIT_CWD environment variable is set to ${process.env.INIT_CWD}`)

  type Action = 'install' | 'uninstall'
  const action = process.argv[2] as Action

  try {
    console.log(
      'husky > %s git hooks',
      action === 'install' ? 'Setting up' : 'Uninstalling'
    )

    if (action === 'install') checkSkipInstallEnv()
    checkGitDirEnv()
    const { gitCommonDir, topLevel } = getGitMeta()
    const INIT_CWD = getInitCwdEnv()

    if (action === 'install') {
      const { name: pmName } = whichPMRuns()
      debug(`Package manager: ${pmName}`)
      install({ topLevel, gitCommonDir, pmName, isCI, INIT_CWD })
    } else {
      uninstall({ gitCommonDir, INIT_CWD })
    }

    console.log(`husky > Done`)
  } catch (error) {
    console.log(chalk.red(error.message.trim()))
    console.log(chalk.red(`husky > Failed to ${action}`))
  }
}

run()
