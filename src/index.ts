import cp from 'child_process'
import fs from 'fs'
import p from 'path'

// Logger
const l = (msg: string): void => console.log(`husky - ${msg}`)

// https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
const h = [
  // Committing-Workflow Hooks
  'pre-commit', 'prepare-commit-msg', 'commit-msg', 'post-commit',
  // Email Workflow Hooks
  'applypatch-msg', 'pre-applypatch', 'post-applypatch',
  // Other Client Hooks
  'pre-rebase', 'post-rewrite', 'post-checkout', 'post-merge', 'pre-push', 'pre-auto-gc',
]

// Execute Git command
const git = (args: string[]): cp.SpawnSyncReturns<Buffer> =>
  cp.spawnSync('git', args, { stdio: 'inherit' })

// Install husky
export default function(dir = '.husky'): void {
  if (process.env['HUSKY'] === '0') {
    l('HUSKY env variable is set to 0, skipping install')
    return
  }

  // Ensure that we're inside a Git repository
  // If git command is not found, status is null and we should return
  // That's why status value needs to be checked explicitly
  if (git(['rev-parse']).status !== 0)
    return l(`git command not found, skipping install`)

  // Custom dir help
  const url = 'https://typicode.github.io/husky/guide.html#custom-directory'

  // Ensure that we're not trying to install outside of cwd
  if (!p.resolve(process.cwd(), dir).startsWith(process.cwd()))
    throw new Error(`.. not allowed (see ${url})`)

  // Ensure that cwd is git top level
  if (!fs.existsSync('.git'))
    throw new Error(`.git can't be found (see ${url})`)

  try {
    // Create hooks dir and change working dir to make file creation simpler
    const d = p.join(dir, '_')
    fs.mkdirSync(d, { recursive: true })
    process.chdir(d)

    // Create the different files in dir/_/
    fs.writeFileSync('.gitignore', '*') // .gitignore
    fs.copyFileSync(new URL('../husky.sh', import.meta.url), 'h.sh')
    h.forEach(f => fs.writeFileSync(f, `#!/usr/bin/env sh\n. "\${0%/*}/h.sh"`, { mode: 0o755 })) // hooks

    // Create empty husky.sh to avoid making v5-8 hooks fail
    // TODO: add deprecation notice later...
    fs.writeFileSync('husky.sh', '')

    // Configure Git
    const { error: e } = git(['config', 'core.hooksPath', d])
    if (e) throw e
  } catch (e) {
    l('Git hooks failed to install')
    throw e
  }

  l('Git hooks installed')
}
