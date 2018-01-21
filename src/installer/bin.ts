import * as execa from 'execa'
import * as fs from 'fs'
import * as isCI from 'is-ci'
import * as path from 'path'
import { install, uninstall } from './'

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
const { code, stdout, stderr } = execa.sync('git', ['rev-parse', '--git-dir'])
const gitDir = path.resolve(stdout) // Needed to normalize path on Windows

if (code !== 0) {
  console.log('husky > failed to install')
  console.log(stderr)
  process.exit(1)
}

// Run installer
if (action === 'install') {
  install(gitDir, huskyDir, isCI)
} else {
  uninstall(gitDir, huskyDir)
}
