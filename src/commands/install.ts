import fs from 'fs'
import path from 'path'
import cp from 'child_process'

export function install(dir = '.husky'): void {
  // Ensure that we're not trying to install outside cwd
  const absoluteHooksDir = path.resolve(process.cwd(), dir)
  if (!absoluteHooksDir.startsWith(process.cwd())) {
    throw new Error('.. not allowed')
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync('.git')) {
    throw new Error(".git can't be found")
  }

  try {
    // Create .husky/_
    fs.mkdirSync(path.join(dir, '_'), { recursive: true })

    // Create .husky/.gitignore
    fs.writeFileSync(path.join(dir, '.gitignore'), '_', 'utf-8')

    // Copy husky.sh to .husky/_/husky.sh
    fs.copyFileSync(
      path.join(__dirname, '../../scripts/husky.sh'),
      path.join(dir, '_/husky.sh'),
    )

    cp.spawnSync('git', ['config', 'core.hooksPath', dir])
  } catch (e) {
    console.log('husky - Git hooks failed to install')
    throw e
  }

  console.log('husky - Git hooks installed')
}
