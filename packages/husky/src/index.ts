import { spawnSync } from 'child_process'
import {
  appendFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'fs'
import { dirname, join, resolve } from 'path'

function l(msg: string): void {
  console.log(`husky - ${msg}`)
}

export function install(dir = '.husky'): void {
  // Ensure that we're inside a git repository
  if (spawnSync('git', ['rev-parse']).status !== 0) {
    l('not a Git repository, skipping hooks installation')
    return
  }

  // Custom dir help
  const url = 'https://typicode.github.io/husky/#/?id=custom-directory'

  // Ensure that we're not trying to install outside of cwd
  if (!resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${url})`)
  }

  // Ensure that cwd is git top level
  if (!existsSync('.git')) {
    throw new Error(`.git can't be found (see ${url})`)
  }

  try {
    // Create .husky/_
    mkdirSync(join(dir, '_'), { recursive: true })

    // Create .husky/.gitignore
    writeFileSync(join(dir, '.gitignore'), '_\n')

    // Copy husky.sh to .husky/_/husky.sh
    copyFileSync(join(__dirname, 'husky.sh'), join(dir, '_/husky.sh'))

    // Configure repo
    const { error } = spawnSync('git', ['config', 'core.hooksPath', dir])
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
  const dir = dirname(file)
  if (!existsSync(dir)) {
    throw new Error(
      `can't create hook, ${dir} directory doesn't exist (try running husky install)`,
    )
  }

  writeFileSync(
    file,
    `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

${cmd}
`,
    { mode: 0o0755 },
  )

  l(`created ${file}`)
}

export function add(file: string, cmd: string): void {
  if (existsSync(file)) {
    appendFileSync(file, `${cmd}\n`)
    l(`updated ${file}`)
  } else {
    set(file, cmd)
  }
}

export function uninstall(): void {
  spawnSync('git', ['config', '--unset', 'core.hooksPath'], {
    stdio: 'inherit',
  })
}
