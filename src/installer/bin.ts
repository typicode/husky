import isCI from 'is-ci'
import path from 'path'
import debug from '../debug'
import { install, uninstall } from './'

// Debug
debug(`CWD=${process.env.CWD}`)
debug(`INIT_CWD=${process.env.INIT_CWD}`)

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
try {
  // Run installer
  if (action === 'install') {
    install(huskyDir, undefined, isCI)
  } else {
    uninstall(huskyDir)
  }
} catch (error) {
  console.log(`husky > failed to ${action}`)
  console.log(error.message)
}
