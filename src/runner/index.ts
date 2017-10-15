import * as execa from 'execa'
import * as readPkg from 'read-pkg'

export default function(
  [, , hookName = '']: string[],
  { cwd = process.cwd() } = {}
): number {
  const pkg = readPkg.sync(cwd)

  const oldCommand: string | undefined =
    pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')]

  const command: string | undefined =
    pkg && pkg.husky && pkg.husky.hooks && pkg.husky.hooks[hookName]

  try {
    if (command) {
      console.log(`husky > ${hookName} (node ${process.version})`)
      execa.shellSync(command, { cwd, stdio: 'inherit' })
      return 0
    }

    if (oldCommand) {
      console.log()
      console.log(
        `Warning: Setting ${hookName} script in package.json > scripts is going to be deprecated`
      )
      console.log(`Please move it to package.json > husky > hooks`)
      console.log(`See https://github.com/typicode/husky/tree/dev`)
      console.log(`Or run ./node_modules/.bin/husky-upgrade`)
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
