import index from './'
import debug from '../debug'
import { checkGitDirEnv } from '../checkGitDirEnv'

// Debug
debug(`Current working directory is '${process.cwd()}'`)

// Check GIT_DIR environment variable
checkGitDirEnv()

// Run hook
index(process.argv)
  .then((status: number): void => process.exit(status))
  .catch((err: Error): void => {
    console.log('Husky > unexpected error', err)
    process.exit(1)
  })
