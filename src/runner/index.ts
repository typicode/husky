import { spawnSync } from 'child_process'
import * as readPkg from 'read-pkg'
import getConf from '../getConf'

/**
 * @param argv - process.argv
 */
export default function([, scriptPath, hookName = '']: string[]): number {
  const [cwd] = scriptPath.split('node_modules')
  const pkg = readPkg.sync(cwd)

  const config = getConf(cwd)

  const command: string | undefined =
    config && config.hooks && config.hooks[hookName]

  const oldCommand: string | undefined =
    pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')]

  if (command) {
    console.log(`husky > ${hookName} (node ${process.version})`)
    return shell(cwd, hookName, command)
  }

  if (oldCommand) {
    console.log()
    console.log(
      `Warning: Setting ${hookName} script in package.json > scripts will be deprecated in v1.0`
    )
    console.log(
      `Please move it to husky.hooks in package.json, a .huskyrc file, or a husky.config.js file`
    )
    console.log(`Or run ./node_modules/.bin/husky-upgrade for automatic update`)
    console.log()
    console.log(`See https://github.com/typicode/husky for usage`)
    console.log()
    console.log(`husky > ${hookName} (node ${process.version})`)
    return shell(cwd, hookName, oldCommand)
  }

  return 0
}

function shell(cwd: string, hookName: string, cmds: string) {
  const shellPath = process.env.SHELL || 'sh'
  let status
  try {
    status = spawnSync(shellPath as string, ['-c', cmds], {
      cwd,
      stdio: 'inherit'
    }).status
  } catch (ex) {
    status = 1
  }
  if (status) {
    const noVerifyMessage =
      hookName === 'prepare-commit-msg'
        ? '(cannot be bypassed with --no-verify due to Git specs)'
        : '(add --no-verify to bypass)'

    console.log(`husky > ${hookName} hook failed ${noVerifyMessage}`)
  }
  return status || 0
}
