import * as execa from 'execa'
import * as readPkg from 'read-pkg'

export default function run(
  [, , hookName = '']: string[],
  { cwd = process.cwd() } = {}
): number {
  const pkg = readPkg.sync(cwd)
  const command: string | undefined =
    pkg && pkg.husky && pkg.husky.hooks && pkg.husky.hooks[hookName]

  try {
    if (command) {
      console.log(`husky > ${hookName} (node ${process.version})`)
      console.log(command)
      execa.shellSync(command, { cwd, stdio: 'inherit' })
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
