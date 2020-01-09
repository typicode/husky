import cp from 'child_process'
import slash from 'slash'

export type GitRevParseResult = {
  prefix: string
  gitCommonDir: string
}

export function gitRevParse(cwd = process.cwd()): GitRevParseResult {
  // https://github.com/typicode/husky/issues/580
  // https://github.com/typicode/husky/issues/587
  const { status, stderr, stdout } = cp.spawnSync(
    'git',
    ['rev-parse', '--show-prefix', '--git-common-dir'],
    { cwd }
  )

  if (status !== 0) {
    throw new Error(stderr.toString())
  }

  const [prefix, gitCommonDir] = stdout
    .toString()
    .split('\n')
    .map(s => s.trim())
    // Normalize for Windows
    .map(slash)

  // Git rev-parse returns unknown options as is.
  // If we get --absolute-git-dir in the output,
  // it probably means that an old version of Git has been used.
  // There seem to be a bug with --git-common-dir that was fixed in 2.13.0.
  // See issues above.
  if (gitCommonDir === '--git-common-dir') {
    throw new Error('Husky requires Git >= 2.13.0, please upgrade Git')
  }

  return { prefix, gitCommonDir }
}
