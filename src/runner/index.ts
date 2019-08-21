import execa from 'execa'
import getStdin from 'get-stdin'
import path from 'path'
import readPkg from 'read-pkg'
import debug from '../debug'
import getConf from '../getConf'

export interface Env extends NodeJS.ProcessEnv {
  HUSKY_GIT_STDIN?: string
  HUSKY_GIT_PARAMS?: string
}

/**
 * @param {array} argv - process.argv
 * @param {promise} getStdinFn - used for mocking only
 */
export default async function run(
  [, scriptPath, hookName = '', HUSKY_GIT_PARAMS]: string[],
  getStdinFn: () => Promise<string> = getStdin
): Promise<number> {
  // Update CWD
  const cwd = path.resolve(scriptPath.split('node_modules')[0])

  // Debug
  debug(`cwd: ${cwd} (updated)`)

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

  // Run command
  try {
    const env: Env = {}

    if (HUSKY_GIT_PARAMS) {
      env.HUSKY_GIT_PARAMS = HUSKY_GIT_PARAMS
    }

    if (
      ['pre-push', 'pre-receive', 'post-receive', 'post-rewrite'].includes(
        hookName
      )
    ) {
      // Wait for stdin
      env.HUSKY_GIT_STDIN = await getStdinFn()
    }

    if (oldCommand) {
      console.log()
      console.log(
        `Warning: Setting ${hookName} script in package.json > scripts will be deprecated`
      )
      console.log(
        `Please move it to husky.hooks in package.json, a .huskyrc file, or a husky.config.js file`
      )
      console.log(
        `Or run ./node_modules/.bin/husky-upgrade for automatic update`
      )
      console.log()
      console.log(`See https://github.com/typicode/husky for usage`)
      console.log()
    }

    if (command || oldCommand) {
      console.log(`husky > ${hookName} (node ${process.version})`)
      execa.shellSync(command || oldCommand, { cwd, env, stdio: 'inherit' })
    }

    return 0
  } catch (err) {
    const noVerifyMessage = [
      'commit-msg',
      'pre-commit',
      'pre-rebase',
      'pre-push'
    ].includes(hookName)
      ? '(add --no-verify to bypass)'
      : '(cannot be bypassed with --no-verify due to Git specs)'

    console.log(`husky > ${hookName} hook failed ${noVerifyMessage}`)
    return err.code
  }
}
