import cp from 'child_process'
import fs from 'fs'
import path from 'path'

import { l } from '../log'

const customDirHelp = 'https://typicode.github.io/husky/#/?id=custom-directory'

export function install(dir = '.husky'): void {
  // Ensure that we're inside a git repository
  if (cp.spawnSync('git', ['rev-parse']).status !== 0) {
    l('not a Git repository, skipping hooks installation')
    return
  }

  // Ensure that we're not trying to install outside of cwd
  const absoluteHooksDir = path.resolve(process.cwd(), dir)
  if (!absoluteHooksDir.startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${customDirHelp})`)
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync('.git')) {
    throw new Error(`.git can't be found (see ${customDirHelp})`)
  }

  try {
    // Create .husky/_
    fs.mkdirSync(path.join(dir, '_'), { recursive: true })

    // Create .husky/.gitignore
    fs.writeFileSync(path.join(dir, '.gitignore'), '_\n', 'utf-8')

    // Copy husky.sh to .husky/_/husky.sh
    fs.copyFileSync(
      path.join(__dirname, '../../scripts/husky.sh'),
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
