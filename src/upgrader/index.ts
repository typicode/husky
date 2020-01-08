import fs from 'fs'
import path from 'path'
import gitHooks from 'git-hooks-list'
import { readPkg } from '../read-pkg'

interface HookMap {
  [key: string]: string
}

const hookList: HookMap = gitHooks.reduce(
  (hookList: HookMap, hook: string): HookMap => {
    hookList[hook.replace(/-/g, '')] = hook
    return hookList
  },
  {}
)

export default function upgrade(cwd: string): void {
  const pkgFile = path.join(cwd, 'package.json')
  if (fs.existsSync(pkgFile)) {
    const pkg = readPkg(cwd)

    console.log(`husky > upgrading ${pkgFile}`)

    // Don't overwrite 'husky' field if it exists
    if (pkg.husky) {
      return console.log(
        `husky field in package.json isn't empty, skipping automatic upgrade`
      )
    }

    const hooks: HookMap = {}

    // Find hooks in package.json 'scripts' field
    Object.keys(hookList).forEach((name: string): void => {
      if (pkg.scripts) {
        const script = pkg.scripts[name]
        if (script) {
          delete pkg.scripts[name]
          const newName = hookList[name]
          hooks[newName] = script.replace(/\bGIT_PARAMS\b/g, 'HUSKY_GIT_PARAMS')
          console.log(`moved scripts.${name} to husky.hooks.${newName}`)
        }
      }
    })

    // Move found hooks to 'husky.hooks' field
    if (Object.keys(hooks).length) {
      pkg.husky = { hooks }
    } else {
      console.log('no hooks found')
    }

    // Update package.json
    fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`, 'utf-8')
    console.log(`husky > done`)
  }
}
