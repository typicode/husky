import isCI from 'is-ci'
import path from 'path'
import { install, uninstall } from './'
import gitRevParse from './gitRevParse'

// Just for testing
if (process.env.HUSKY_DEBUG === 'true' || process.env.HUSKY_DEBUG === '1') {
  console.log(`husky:debug INIT_CWD=${process.env.INIT_CWD}`)
}

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
try {
  const { topLevel, gitDir } = gitRevParse()

  // Run un/installer
  if (action === 'install') {
    install(topLevel, gitDir, huskyDir, isCI)
  } else {
    uninstall(gitDir, huskyDir)
  }
} catch (error) {
  console.log(`husky > failed to ${action}`)
  console.log(error.message)
}
