import cp from 'child_process'

export function uninstall(): void {
  cp.spawnSync('git', ['config', '--unset', 'core.hooksPath'], {
    stdio: 'inherit',
  })
}
