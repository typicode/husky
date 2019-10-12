import slash from 'slash'
import execa from 'execa'

export default function(): {
  topLevel: string
  gitCommonDir: string
} {
  // https://github.com/typicode/husky/issues/580
  // https://github.com/typicode/husky/issues/587
  const result = execa.sync('git', [
    'rev-parse',
    '--show-toplevel',
    '--git-common-dir'
  ])

  const [topLevel, gitCommonDir] = result.stdout
    .trim()
    .split('\n')
    // Normalize for Windows
    .map(slash)

  // Git rev-parse returns unknown options as is.
  // If we get --absolute-git-dir in the output,
  // it probably means that an older version of Git has been used.
  if (gitCommonDir === '--git-common-dir') {
    throw new Error('Husky requires Git >= 2.13.0, please upgrade Git')
  }

  return { topLevel, gitCommonDir }
}
