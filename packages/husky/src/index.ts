import fs = require('fs')
import cp = require('child_process')
import path = require('path')

function l(msg: string): void {
  console.log(`husky - ${msg}`)
}

export function install(dir = '.husky'): void {
  // Ensure that we're inside a git repository
  if (cp.spawnSync('git', ['rev-parse']).status !== 0) {
    l('not a Git repository, skipping hooks installation')
    return
  }

  // Custom dir help
  const url = 'https://typicode.github.io/husky/#/?id=custom-directory'

  // Ensure that we're not trying to install outside of cwd
  if (!path.resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${url})`)
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync('.git')) {
    throw new Error(`.git can't be found (see ${url})`)
  }

  try {
    // Create .husky/_
    fs.mkdirSync(path.join(dir, '_'), { recursive: true })

    // Create .husky/.gitignore
    fs.writeFileSync(path.join(dir, '.gitignore'), '_\n')

    // Copy husky.sh to .husky/_/husky.sh
    fs.copyFileSync(
      path.join(__dirname, 'husky.sh'),
      path.join(dir, '_/husky.sh'),
    )

    // Configure repo
    const { error } = cp.spawnSync('git', ['config', 'core.hooksPath', dir])
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
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    throw new Error(
      `can't create hook, ${dir} directory doesn't exist (try running husky install)`,
    )
  }

  fs.writeFileSync(
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
  if (fs.existsSync(file)) {
    fs.appendFileSync(file, `${cmd}\n`)
    l(`updated ${file}`)
  } else {
    set(file, cmd)
  }
}

export function uninstall(): void {
  cp.spawnSync('git', ['config', '--unset', 'core.hooksPath'], {
    stdio: 'inherit',
  })
}
