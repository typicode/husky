import { debug } from './debug'

export function checkGitDirEnv(): void {
  if (process.env.GIT_DIR) {
    debug(`GIT_DIR environment variable is set to ${process.env.GIT_DIR}`)
    debug(
      `If you're getting "fatal: not a git repository" errors, check GIT_DIR value`
    )
  }
}
