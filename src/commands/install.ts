import fs from 'fs'
import path from 'path'
import cp from 'child_process'

export function install({
  cwd,
  pathToPackageDir = '.',
}: {
  cwd: string
  pathToPackageDir: string
}): void {
  const absoluteHooksDir = path.resolve(cwd, pathToPackageDir)

  // Ensure that we're not trying to install outside cwd
  if (!absoluteHooksDir.startsWith(cwd)) {
    throw new Error('.. not allowed')
  }

  // Ensure that cwd is git top level
  if (!fs.existsSync(path.join(cwd, '.git'))) {
    throw new Error(".git can't be found")
  }

  // Ensure that pathToPackageDir contains package.json
  if (!fs.existsSync(path.join(absoluteHooksDir, 'package.json'))) {
    throw new Error("package.json can't be found")
  }

  const preCommitDir = path.join(__dirname, '../../scripts')
  const preCommitFilename = path.join(preCommitDir, 'pre-commit')
  fs.chmodSync(preCommitFilename, 0o0755)

  cp.spawnSync('git', ['config', 'core.hooksPath', preCommitDir])

  cp.spawnSync('git', ['commit'], {
    stdio: 'inherit',
    env: { ...process.env, husky_dir: path.join(absoluteHooksDir, '.husky') },
  })
}
