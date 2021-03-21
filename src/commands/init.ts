import fs from 'fs'
import { PackageJson } from 'type-fest'

import { install } from './install'
import { set } from './set_add'

const regex = /^[ ]+|\t+/m

export function init(isYarn2: boolean): void {
  // Read package.json
  const str = fs.readFileSync('package.json', 'utf-8')
  const pkg = JSON.parse(str) as PackageJson

  // Update package.json fields
  if (isYarn2) {
    pkg.scripts ||= {}
    pkg.scripts.postinstall = 'husky install'
    if (pkg.private !== true) {
      pkg.scripts.prepublishOnly = 'pinst --disable'
      pkg.scripts.postpublish = 'pinst --enable'
      pkg.devDependencies ||= {}
      pkg.devDependencies.pinst = '^2.0.0'
    }
  } else {
    pkg.scripts ||= {}
    pkg.scripts.prepare = 'husky install'
  }

  // Write package.json
  const indent = regex.exec(str)?.[0]
  fs.writeFileSync('package.json', `${JSON.stringify(pkg, null, indent)}\n`)
  console.log('husky - updated package.json')

  // Install husky
  install()

  // Add pre-commit sample
  set('.husky/pre-commit', 'npm test')
}
