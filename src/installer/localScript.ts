import fs = require('fs')
import path = require('path')
import { getBanner } from './getBanner'

export function getLocalScript(
  pmName: string,
  relativeUserPkgDir: string
): string {
  return `${getBanner()}

packageManager=${pmName}
cd "${relativeUserPkgDir}"
`
}

export function createLocalScript(
  gitHooksDir: string,
  pmName: string,
  relativeUserPkgDir: string
): void {
  fs.writeFileSync(
    path.join(gitHooksDir, 'husky.local.sh'),
    getLocalScript(pmName, relativeUserPkgDir),
    'utf-8'
  )
}

export function removeLocalScript(gitHooksDir: string): void {
  const filename = path.join(gitHooksDir, 'husky.local.sh')
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename)
  }
}
