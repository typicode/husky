import fs = require('fs')
import path = require('path')
import { getBanner } from './getBanner'
import { readPkg } from '../read-pkg'

export function getMainScript(): string {
  const pkg = readPkg(path.join(__dirname, '../..'))

  const mainScript = fs
    .readFileSync(path.join(__dirname, '../../sh/husky.sh'), 'utf-8')
    .replace('huskyVersion="0.0.0"', `huskyVersion="${pkg.version}"`)

  return [getBanner(), '', mainScript].join('\n')
}

export function createMainScript(gitHooksDir: string): void {
  fs.writeFileSync(path.join(gitHooksDir, 'husky.sh'), getMainScript(), 'utf-8')
}

export function removeMainScript(gitHooksDir: string): void {
  fs.unlinkSync(path.join(gitHooksDir, 'husky.sh'))
}
