import cp = require('child_process')
import fs = require('fs')
import p = require('path')

// Logger
const l = (msg: string): void => console.log(`husky - ${msg}`)

// https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
const hooks = [
  // Committing-Workflow Hooks
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  // Email Workflow Hooks
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  // Other Client Hooks
  'pre-rebase',
  'post-rewrite',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-auto-gc',
]

// Execute Git command
const git = (args: string[]): cp.SpawnSyncReturns<Buffer> =>
  cp.spawnSync('git', args, { stdio: 'inherit' })

// Install husky
export default function (dir = '.husky'): void {
  if (process.env.HUSKY === '0') {
    l('HUSKY env variable is set to 0, skipping install')
    return
  }

  // Ensure that we're inside a Git repository
  // If git command is not found, status is null and we should return
  // That's why status value needs to be checked explicitly
  if (git(['rev-parse']).status !== 0) {
    l(`git command not found, skipping install`)
    return
  }

  // Custom dir help
  const url = 'https://typicode.github.io/husky/guide.html#custom-directory'

  // Ensure that we're not trying to install outside of cwd
  if (!p.resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${url})`)
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync('.git')) {
    throw new Error(`.git can't be found (see ${url})`)
  }

  try {
    const h = p.join(dir, '_')
    // Create hooks dir
    fs.mkdirSync(h, { recursive: true })

    // Create .gitignore in hooks dir
    fs.writeFileSync(p.join(h, '.gitignore'), '*')

    // Copy husky.sh to hooks dir
    fs.copyFileSync(p.join(__dirname, '../husky.sh'), p.join(h, 'husky.sh'))

    // Prepare hooks
    const data = `#!/bin/sh\n. "$(dirname "$0")/husky.sh"`
    for (const hook of hooks) {
      fs.writeFileSync(p.join(h, hook), data, { mode: 0o755 })
    }
    // Configure repo
    const { error } = git(['config', 'core.hooksPath', h])
    if (error) {
      throw error
    }
  } catch (e) {
    l('Git hooks failed to install')
    throw e
  }

  l('Git hooks installed')
}
