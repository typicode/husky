import fs from 'fs'
import { PackageJson } from 'type-fest'
import { add } from './add'
import { install } from './install'

const regex = /^[ ]+|\t+/m

export function init(): void {
  // Read package.json
  const str = fs.readFileSync('package.json', 'utf-8')
  const pkg = JSON.parse(str) as PackageJson

  // Add postinstall script
  pkg.scripts ||= {}
  pkg.scripts.postinstall = 'husky install'

  // Write package.json
  const indent = regex.exec(str)?.[0]
  fs.writeFileSync('package.json', `${JSON.stringify(pkg, null, indent)}\n`)

  // Install husky
  install()

  // Add pre-commit sample
  add('.husky/pre-commit', 'npm test')

  // Add pinst
  if (pkg.private !== true) {
    console.log(`⚠ if you're publishing your package to npm, you need to disable postinstall script using pinst.
see https://typicode.github.io/husky/#/?id=install
`)
  }
}
