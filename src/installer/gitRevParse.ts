import slash from 'slash'
import execa from 'execa'

export default function(): {
  topLevel: string
  gitDir: string
} {
  try {
    const { stdout } = execa.sync('git', [
      'rev-parse',
      '--show-toplevel',
      '--absolute-git-dir'
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
