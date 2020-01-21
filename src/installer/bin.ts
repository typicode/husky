import chalk from 'chalk'
import { isCI } from 'ci-info'
import path from 'path'
import pkgDir from 'pkg-dir'
import whichPMRuns from 'which-pm-runs'
import { checkGitDirEnv } from '../checkGitDirEnv'
import { debug } from '../debug'
import { install, uninstall } from './'
import { gitRevParse } from './gitRevParse'
import { checkGitVersion } from './checkGitVersion'

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

function getDirs(
  cwd: string
): { absoluteGitCommonDir: string; relativeUserPkgDir: string } {
  const { prefix, gitCommonDir } = gitRevParse(cwd)

  debug('Git rev-parse command returned:')
  debug(`  --git-common-dir: ${gitCommonDir}`)
  debug(`  --show-prefix: ${prefix}`)

  const absoluteGitCommonDir = path.resolve(cwd, gitCommonDir)
  // Prefix can be an empty string
  const relativeUserPkgDir = prefix || '.'

  return { relativeUserPkgDir, absoluteGitCommonDir }
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

function getUserPkgDir(dir: string): string {
  const userPkgDir = pkgDir.sync(dir)

  if (userPkgDir === undefined) {
    throw new Error(
      [
        `Can't find package.json in ${dir} directory or parents`,
        'Please check that your project has a package.json or create one and reinstall husky.'
      ].join('\n')
    )
  }

  return userPkgDir
}

function run(): void {
  type Action = 'install' | 'uninstall'
  const action = process.argv[2] as Action

  try {
    console.log(
      'husky > %s git hooks',
      action === 'install' ? 'Setting up' : 'Uninstalling'
    )

    debug(`Current working directory is ${process.cwd()}`)

    if (action === 'install') {
      checkSkipInstallEnv()
      checkGitVersion()
    }

    const INIT_CWD = getInitCwdEnv()
    const userPkgDir = getUserPkgDir(INIT_CWD)
    checkGitDirEnv()
    const { absoluteGitCommonDir, relativeUserPkgDir } = getDirs(userPkgDir)

    if (action === 'install') {
      const { name: pmName } = whichPMRuns()
      debug(`Package manager: ${pmName}`)
      install({
        absoluteGitCommonDir,
        relativeUserPkgDir,
        userPkgDir,
        pmName,
        isCI
      })
    } else {
      uninstall({ absoluteGitCommonDir, userPkgDir })
    }

    console.log(`husky > Done`)
  } catch (err) {
    console.log(chalk.red(err.message.trim()))
    debug(err.stack)
    console.log(chalk.red(`husky > Failed to ${action}`))
  }
}

run()
