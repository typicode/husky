import fs from 'fs'
import path from 'path'
import { PackageJson } from 'type-fest'

export function readPkg(dir: string): PackageJson {
  const pkgFile = path.resolve(dir, 'package.json')
  const pkgStr = fs.readFileSync(pkgFile, 'utf-8')
  return JSON.parse(pkgStr)
}
