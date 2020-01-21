import path = require('path')
import { readPkg } from '../read-pkg'

export function getBanner(): string {
  const pkgHomepage = process.env.npm_package_homepage
  const pkgDirectory = process.env.PWD

  const { homepage: huskyHomepage, version: huskyVersion } = readPkg(
    path.join(__dirname, '../..')
  )

  const createdAt = new Date().toLocaleString()
  return `# Created by Husky v${huskyVersion} (${huskyHomepage})
#   At: ${createdAt}
#   From: ${pkgDirectory} (${pkgHomepage})`
}
