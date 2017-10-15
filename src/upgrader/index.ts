import * as path from 'path'
import * as fs from 'fs'

const hookList = {
  applypatchmsg: 'applypatch-msg',
  preapplypatch: 'pre-applypatch',
  postapplypatch: 'post-applypatch',
  precommit: 'pre-commit',
  preparecommitmsg: 'prepare-commit-msg',
  commitmsg: 'commit-msg',
  postcommit: 'post-commit',
  prerebase: 'pre-rebase',
  postcheckout: 'post-checkout',
  postmerge: 'post-merge',
  prepush: 'pre-push',
  prereceive: 'pre-receive',
  update: 'update',
  postreceive: 'post-receive',
  postupdate: 'post-update',
  pushtocheckout: 'push-to-checkout',
  preautogc: 'pre-auto-gc',
  postrewrite: 'post-rewrite',
  sendemailvalidate: 'sendemail-validate'
}

export default function migrate(dir: string) {
  const pkgFile = path.join(dir, 'package.json')
  if (fs.existsSync(pkgFile)) {
    const pkg = JSON.parse(fs.existsSync(pkgFile))
    pkg.husky = { hooks: {} }
    Object.keys(hookList).forEach(previous => {
      const script = pkg.scripts[previous]
      if (script) {
        delete pkg.scripts[previous]        
      }

    })
  }
}