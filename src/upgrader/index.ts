import * as fs from 'fs'
import * as path from 'path'
import * as readPkg from 'read-pkg'

interface IHookMap {
  [key: string]: string
}

const hookList: IHookMap = {
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
  preparecommitmsg: 'prepare-commit-msg',
  prepush: 'pre-push',
  prerebase: 'pre-rebase',
  prereceive: 'pre-receive',
  pushtocheckout: 'push-to-checkout',
  sendemailvalidate: 'sendemail-validate',
  update: 'update'
}

export default function upgrade(cwd: string) {
  const pkgFile = path.join(cwd, 'package.json')
  if (fs.existsSync(pkgFile)) {
    const pkg = readPkg.sync({ cwd, normalize: false })

    console.log(`husky > upgrading ${pkgFile}`)

    // Don't overwrite pkg.husky if it exists
    if (pkg.husky) {
      return console.log(
        `husky field in package.json isn't empty, skipping automatic upgrade`
      )
    }

    // Create empty husky.hooks field
    pkg.husky = { hooks: {} }

    // Loop trhough hooks and move them to husky.hooks
    Object.keys(hookList).forEach(name => {
      const script = pkg.scripts[name]
      if (script) {
        delete pkg.scripts[name]
        const newName = hookList[name]
        pkg.husky.hooks[newName] = script
        console.log(`moved scripts.${name} to husky.hooks.${newName}`)
      }
    })

    // Update package.json
    fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`, 'utf-8')
    console.log(`husky > done`)
  }
}
