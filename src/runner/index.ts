import * as cosmiconfig from 'cosmiconfig'
import * as execa from 'execa'
import * as getStdin from 'get-stdin'
import * as readPkg from 'read-pkg'
import getConf from '../getConf'

export interface IEnv extends NodeJS.ProcessEnv {
  GIT_STDIN?: string
  GIT_PARAMS?: string
}

export default async function(
  // process.argv
  [, , hookName = '', GIT_PARAMS]: string[],
  // options for testing
  { cwd = process.cwd() } = {}
): Promise<number> {
  const pkg = readPkg.sync(cwd)

  const config = getConf(cwd)

  const command: string | undefined =
    config && config.hooks && config.hooks[hookName]

  const oldCommand: string | undefined =
    pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')]

  try {
    const env: IEnv = {
      GIT_PARAMS
    }

    if (['pre-push', 'pre-receive', 'post-receive', 'post-rewrite']) {
      env.GIT_STDIN = await getStdin()
    }

    if (command) {
      console.log(`husky > ${hookName} (node ${process.version})`)
      execa.shellSync(command, { cwd, stdio: 'inherit', env })
      return 0
    }

    if (oldCommand) {
      console.log()
      console.log(
        `Warning: Setting ${hookName} script in package.json > scripts will be deprecated in v1.0`
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
      console.log(`husky > ${hookName} (node ${process.version})`)
      execa.shellSync(oldCommand, { cwd, stdio: 'inherit' })
      return 0
    }

    return 0
  } catch (e) {
    const noVerifyMessage =
      hookName === 'prepare-commit-msg'
        ? '(cannot be bypassed with --no-verify due to Git specs)'
        : '(add --no-verify to bypass)'

    console.log(`husky > ${hookName} hook failed ${noVerifyMessage}`)
    return 1
  }
}
