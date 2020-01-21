import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { getConf } from '../getConf'
import { readPkg } from '../read-pkg'

export interface Env extends NodeJS.ProcessEnv {
  HUSKY_GIT_STDIN?: string
  HUSKY_GIT_PARAMS?: string
}

// Husky <1.0.0 (commands were defined in pkg.scripts)
function getOldCommand(cwd: string, hookName: string): string | undefined {
  // In some cases, package.json may not exist
  // For example, when switching to gh-page branch
  let pkg: { scripts?: { [key: string]: string } } = {}
  try {
    pkg = readPkg(cwd)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }

  return pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')]
}

// Husky >= 1.0.0
function getCommand(cwd: string, hookName: string): string | undefined {
  const config = getConf(cwd)

  return config && config.hooks && config.hooks[hookName]
}

function runCommand(
  cwd: string,
  hookName: string,
  cmd: string,
  env: Env
): number {
  console.log(`husky > ${hookName} (node ${process.version})`)

  const SHELL = process.env.SHELL || 'sh'
  const { status } = spawnSync(SHELL, ['-c', cmd], {
    cwd,
    env: { ...process.env, ...env },
    stdio: 'inherit'
  })

  if (status !== 0) {
    const noVerifyMessage = [
      'commit-msg',
      'pre-commit',
      'pre-rebase',
      'pre-push'
    ].includes(hookName)
      ? '(add --no-verify to bypass)'
      : '(cannot be bypassed with --no-verify due to Git specs)'

    console.log(`husky > ${hookName} hook failed ${noVerifyMessage}`)
  }

  return status || 0
}

/**
 * @param {array} argv process.argv
 * @param {string} options.cwd cwd
 * @param {promise} options.getStdinFn - used for mocking only
 */
export default async function run(
  [, , hookName = '', HUSKY_GIT_PARAMS]: string[],
  { cwd = process.cwd() }: { cwd?: string } = {}
): Promise<number> {
  const oldCommand = getOldCommand(cwd, hookName)
  const command = getCommand(cwd, hookName)

  // Add HUSKY_GIT_PARAMS to env
  const env: Env = {}

  if (HUSKY_GIT_PARAMS) {
    env.HUSKY_GIT_PARAMS = HUSKY_GIT_PARAMS
  }

  if (command) {
    return runCommand(cwd, hookName, command, env)
  }

  if (oldCommand) {
    console.log(
      chalk.red(`
Warning: Setting ${hookName} script in package.json > scripts will be deprecated.
Please move it to husky.hooks in package.json or .huskyrc file.

For an automatic update you can also run:
npx --no-install husky-upgrade
yarn husky-upgrade

See https://github.com/typicode/husky for more information.
`)
    )
    return runCommand(cwd, hookName, oldCommand, env)
  }

  return 0
}
