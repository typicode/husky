import isCI from 'is-ci'
import path from 'path'
import debug from '../debug'
import { install, uninstall } from './'
import gitRevParse from './gitRevParse'

// Debug
debug(`CWD=${process.env.CWD}`)
debug(`INIT_CWD=${process.env.INIT_CWD}`)

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
try {
  console.log(
    'husky > %s git hooks',
    action === 'install' ? 'Setting up' : 'Uninstalling'
  )

  const { topLevel, gitDir } = gitRevParse()

  if (action === 'install') {
    install(topLevel, gitDir, huskyDir, isCI)
  } else {
    uninstall(gitDir, huskyDir)
  }
} catch (error) {
  console.log(error.message.trim())
  console.log(`husky > Failed to ${action}`)
}
