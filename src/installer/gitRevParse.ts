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
    .map((s) => s.trim())
    // Normalize for Windows
    .map(slash)

  return { prefix, gitCommonDir }
}
