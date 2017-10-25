import * as execa from 'execa'
import * as readPkg from 'read-pkg'

export default function(
  [, , hookName = '']: string[],
  { cwd = process.cwd() } = {}
): number {
  const pkg = readPkg.sync(cwd)

  const command: string | undefined =
    pkg && pkg.husky && pkg.husky.hooks && pkg.husky.hooks[hookName]

  const oldCommand: string | undefined =
    pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')]

  try {
    if (command) {
      console.log(`husky > ${hookName} (node ${process.version})`)
      execa.shellSync(command, { cwd, stdio: 'inherit' })
      return 0
    }

    if (oldCommand) {
      console.log()
      console.log(
        `Warning: Setting ${hookName} script in package.json > scripts will be deprecated in v1.0`
      )
      console.log(`Please move it to husky.hooks in package.json`)
      console.log(
        `Or run ./node_modules/.bin/husky-upgrade for automatic update`
      )
      console.log()
      console.log(`See https://github.com/typicode/husky/tree/dev for usage`)
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
