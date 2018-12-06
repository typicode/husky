import * as fs from 'fs'
import * as path from 'path'
import * as resolve from 'resolve'

const { version: thisHuskyVersion } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
)

export default function checkVersion(cwd: string) {
  let huskyVersion: string | undefined
  let err: NodeJS.ErrnoException | undefined
  try {
    const pathToHusky = resolve.sync('husky/package.json', { basedir: cwd })
    huskyVersion = require(pathToHusky).version
  } catch (error) {
    err = error
  }

  if (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error('husky is not currently installed in this repository.')
    }
    throw err
  }

  if (thisHuskyVersion !== huskyVersion) {
    throw new Error(
      `This version of husky is not compatible with your current version, use npx husky@${huskyVersion} husky-upgrade instead.`
    )
  }
}
