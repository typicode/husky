import os from 'os'
import fs from 'fs'
import path from 'path'
import cp from 'child_process'

function copyScript(scriptName: string, destDir: string) {
  fs.copyFileSync(
    path.join(__dirname, '../../scripts', scriptName),
    path.join(destDir, scriptName),
  )
}

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

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'husky-'))

  copyScript('husky.sh', tmpDir)
  copyScript('pre-commit', tmpDir)

  fs.chmodSync(path.join(tmpDir, 'pre-commit'), 0o0755)

  cp.spawnSync('git', ['config', 'core.hooksPath', tmpDir])
  cp.spawnSync('git', ['commit', '--author', 'husky <husky@example.com>'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      husky_dir: dir,
    },
  })
}
