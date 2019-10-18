import fs from 'fs'
import path from 'path'

export function readPkg(dir: string) {
  const pkgFile = path.resolve(dir, 'package.json')
  const pkgStr = fs.readFileSync(pkgFile, 'utf-8')
  return JSON.parse(pkgStr)
}
