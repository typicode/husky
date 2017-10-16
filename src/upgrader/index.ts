import * as fs from 'fs'
import * as path from 'path'
import * as readPkg from 'read-pkg'

const hookList = {
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

export default function migrate(dir: string) {
  const pkgFile = path.join(dir, 'package.json')
  if (fs.existsSync(pkgFile)) {
    const pkg = readPkg.sync(dir, { normalize: false })
    pkg.husky = { hooks: {} }

    console.log(`husky > upgrading ${pkgFile}`)
    Object.keys(hookList).forEach(name => {
      const script = pkg.scripts[name]
      if (script) {
        delete pkg.scripts[name]
      }
      pkg.husky.hooks[hookList[name]] = script
    })

    fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2), 'utf-8')
  }
}
