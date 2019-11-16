import fs from 'fs'
import path from 'path'
import readPkg from 'read-pkg'

interface HookMap {
  [key: string]: string
}

const hookList: HookMap = {
  applypatchmsg: 'applypatch-msg',
  commitmsg: 'commit-msg',
  postapplypatch: 'post-applypatch',
  postcheckout: 'post-checkout',
  postcommit: 'post-commit',
  postmerge: 'post-merge',
  postreceive: 'post-receive',
  postrewrite: 'post-rewrite',
  postupdate: 'post-update',
  preapplypatch: 'pre-applypatch',
  preautogc: 'pre-auto-gc',
  precommit: 'pre-commit',
  premergecommit: 'pre-merge-commit',
  preparecommitmsg: 'prepare-commit-msg',
  prepush: 'pre-push',
  prerebase: 'pre-rebase',
  prereceive: 'pre-receive',
  pushtocheckout: 'push-to-checkout',
  sendemailvalidate: 'sendemail-validate',
  update: 'update'
}

export default function upgrade(cwd: string): void {
  const pkgFile = path.join(cwd, 'package.json')
  if (fs.existsSync(pkgFile)) {
    const pkg = readPkg.sync({ cwd, normalize: false })

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
