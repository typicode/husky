import slash from 'slash'
import execa from 'execa'

export default function(): {
  // Show the absolute path of the top-level directory.
  topLevel: string
  // Show $GIT_COMMON_DIR if defined, else $GIT_DIR.
  gitDir: string
} {
  try {
    const { stdout } = execa.sync('git', [
      'rev-parse',
      '--show-toplevel',
      '--git-common-dir'
    ])

    const [topLevel, gitDir] = stdout
      .trim()
      .split('\n')
      // Normalize for Windows
      .map(slash)
    return { topLevel, gitDir }
  } catch (error) {
    throw new Error(error.stderr)
  }
}
