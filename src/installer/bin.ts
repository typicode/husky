import * as execa from 'execa'
import * as fs from 'fs'
import * as isCI from 'is-ci'
import * as path from 'path'
import { install, uninstall } from './'

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
try {
  const { stdout } = execa.sync('git', ['rev-parse', '--git-dir'])

  // Needed to normalize path on Windows
  const gitDir = path.resolve(stdout)

  // Run installer
  if (action === 'install') {
    install(gitDir, huskyDir, isCI)
  } else {
    uninstall(gitDir, huskyDir)
  }
} catch (error) {
  console.log(`husky > failed to ${action}`)
  console.log(error.message)
}
