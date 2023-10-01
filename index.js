import c from 'child_process'
import f from 'fs'
import p from 'path'

let l = [ 'pre-commit', 'prepare-commit-msg', 'commit-msg', 'post-commit', 'applypatch-msg', 'pre-applypatch', 'post-applypatch', 'pre-rebase', 'post-rewrite', 'post-checkout', 'post-merge', 'pre-push', 'pre-auto-gc' ]

export default (d = '.husky') => {
	if (process.env.HUSKY === '0') return 'HUSKY=0 skip install'
	if (d.includes('..')) throw '.. not allowed'
	if (!f.existsSync('.git')) return `.git can't be found`

	let _ = p.join(d, '_')
	let { status: s, stderr: e } = c.spawnSync('git', ['config', 'core.hooksPath', _])
	if (s == null) return 'git command not found'
	if (s) return '' + e

	f.mkdirSync(_, { recursive: true })
	process.chdir(_)
	f.writeFileSync('.gitignore', '*')
	f.copyFileSync(new URL('husky.sh', import.meta.url), 'h')
	l.forEach(h => f.writeFileSync(h, `#!/usr/bin/env sh\n. "\${0%/*}/h"`, { mode: 0o755 }))
	f.writeFileSync('husky.sh', '')
	return ''
}