import { spawnSync } from 'child_process'
import getStdin from 'get-stdin'
import readPkg from 'read-pkg'
import getConf from '../getConf'

export interface Env extends NodeJS.ProcessEnv {
  HUSKY_GIT_STDIN?: string
  HUSKY_GIT_PARAMS?: string
}

function runCmd(cwd: string, hookName: string, cmd: string, env: Env): number {
  const shellPath = process.env.SHELL || 'sh'
  let status

  console.log(`husky > ${hookName} (node ${process.version})`)

  try {
    status = spawnSync(shellPath as string, ['-c', cmd], {
      cwd,
      env: { ...process.env, ...env },
      stdio: 'inherit'
    }).status
  } catch {
    status = 1
  }

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
 * @param {array} argv - process.argv
 * @param {string} options.cwd - cwd
 * @param {promise} options.getStdinFn - used for mocking only
 */
export default async function run(
  [, , hookName = '', HUSKY_GIT_PARAMS]: string[],
  {
    cwd = process.cwd(),
    getStdinFn = getStdin
  }: { cwd?: string; getStdinFn?: () => Promise<string> } = {}
): Promise<number> {
  // In some cases, package.json may not exist
  // For example, when switching to gh-page branch
  let pkg
  try {
    pkg = readPkg.sync({ cwd, normalize: false })
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }

  const config = getConf(cwd)

  const command: string | undefined =
    config && config.hooks && config.hooks[hookName]

  const oldCommand: string | undefined =
    pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')]

  // Add HUSKY_GIT_PARAMS to env
  const env: Env = {}

  if (HUSKY_GIT_PARAMS) {
    env.HUSKY_GIT_PARAMS = HUSKY_GIT_PARAMS
  }

  // Read stdin
  if (
    ['pre-push', 'pre-receive', 'post-receive', 'post-rewrite'].includes(
      hookName
    )
  ) {
    // Add HUSKY_GIT_STDIN to env
    env.HUSKY_GIT_STDIN = await getStdinFn()
  }

  if (oldCommand) {
    console.log(`
Warning: Setting ${hookName} script in package.json > scripts will be deprecated.
Please move it to husky.hooks in package.json or .huskyrc file.

For an automatic updata you can also run:
npx --no-install husky-upgrade
yarn husky-upgrade

See https://github.com/typicode/husky for more information.
`)
  }

  if (command) {
    return runCmd(cwd, hookName, command, env)
  }

  if (oldCommand) {
    return runCmd(cwd, hookName, oldCommand, env)
  }

  return 0
}
