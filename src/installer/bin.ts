import * as execa from 'execa'
import * as fs from 'fs'
import * as isCI from 'is-ci'
import * as path from 'path'
import { install, uninstall } from './'

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Run installer
if (action === 'install') {
  install('', huskyDir, isCI)
} else {
  uninstall('', huskyDir)
}
