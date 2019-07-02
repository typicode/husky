import slash from 'slash'
import execa from 'execa'

export default function(): {
  topLevel: string
  absoluteGitDir: string
} {
  let result
  try {
    result = execa.sync('git', [
      'rev-parse',
      '--show-toplevel',
      '--absolute-git-dir'
    ])
  } catch (error) {
    throw new Error(error.stderr)
  }

  const [topLevel, absoluteGitDir] = result.stdout
    .trim()
    .split('\n')
    // Normalize for Windows
    .map(slash)

  // Git rev-parse returns unknown options as is.
  // If we get --absolute-git-dir in the output,
  // it probably means that an older version of Git has been used.
  if (absoluteGitDir === '--absolute-git-dir') {
    throw new Error('Husky requires Git >= 2.13.2, please update Git')
  }

  return { topLevel, absoluteGitDir }
}
