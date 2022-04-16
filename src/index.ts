import cp = require('child_process')
import fs = require('fs')
import p = require('path')

// Logger
const l = (msg: string): void => console.log(`husky - ${msg}`)

// Git command
const git = (args: string[]): cp.SpawnSyncReturns<Buffer> =>
  cp.spawnSync('git', args, { stdio: 'inherit' })

export function install(dir = '.husky'): void {
  // Ensure that we're inside a git repository
  // If git command is not found, status is null and we should return.
  // That's why status value needs to be checked explicitly.
  if (git(['rev-parse']).status !== 0) {
    return
  }

  // Custom dir help
  const url = 'https://git.io/Jc3F9'

  // Ensure that we're not trying to install outside of cwd
  if (!p.resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${url})`)
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync('.git')) {
    throw new Error(`.git can't be found (see ${url})`)
  }

  try {
    // Create .husky/_
    fs.mkdirSync(p.join(dir, '_'), { recursive: true })

    // Create .husky/_/.gitignore
    fs.writeFileSync(p.join(dir, '_/.gitignore'), '*')

    // Copy husky.sh to .husky/_/husky.sh
    fs.copyFileSync(p.join(__dirname, '../husky.sh'), p.join(dir, '_/husky.sh'))

    // Configure repo
    const { error } = git(['config', 'core.hooksPath', dir])
    if (error) {
      throw error
    }
  } catch (e) {
    l('Git hooks failed to install')
    throw e
  }

  l('Git hooks installed')
}

export function set(file: string, cmd: string): void {
  const dir = p.dirname(file)
  if (!fs.existsSync(dir)) {
    throw new Error(
      `can't create hook, ${dir} directory doesn't exist (try running husky install)`,
    )
  }

  fs.writeFileSync(
    file,
    `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

${cmd}
`,
    { mode: 0o0755 },
  )

  l(`created ${file}`)
}

export function add(file: string, cmd: string): void {
  if (fs.existsSync(file)) {
    fs.appendFileSync(file, `${cmd}\n`)
    l(`updated ${file}`)
  } else {
    set(file, cmd)
  }
}

export function uninstall(): void {
  git(['config', '--unset', 'core.hooksPath'])
}
