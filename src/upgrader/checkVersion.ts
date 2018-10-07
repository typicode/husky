import { execSync } from 'child_process'

export default function checkVersion(cwd: string) {
  const modulePaths: string[] = module.paths // save module.paths
  const saveCwd: string = process.cwd() // save process.cwd()
  process.chdir(cwd) // make process.cwd() return cwd

  const thisHuskyVersion: string = require('../../package.json').version

  const cwdModulePaths: string[] = JSON.parse(
    execSync('node -p "JSON.stringify(module.paths)"').toString()
  )

  module.paths = cwdModulePaths || []

  let huskyVersion: string | undefined
  let err: NodeJS.ErrnoException | undefined
  try {
    huskyVersion = require('husky/package.json').version
  } catch (error) {
    err = error
  }

  module.paths = modulePaths // restore module.paths
  process.chdir(saveCwd) // restore process.cwd()

  if (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error('husky is not currently installed in this repository.')
    } else {
      throw err
    }
  }

  if (thisHuskyVersion !== huskyVersion) {
    throw new Error(
      `This version of husky is not compatible with your current version, use npx husky@${huskyVersion} husky-upgrade instead.`
    )
  }
}
