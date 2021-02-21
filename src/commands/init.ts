import fs from 'fs'
import { PackageJson } from 'type-fest'
import { add } from './add'
import { install } from './install'

export function init(): void {
  // Read package.json
  const pkg = JSON.parse(
    fs.readFileSync('package.json', 'utf-8')
  ) as PackageJson

  // Add postinstall script
  if (pkg.scripts !== undefined) {
    pkg.scripts.postinstall = 'husky install'
  }
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
