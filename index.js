import c from 'child_process'
import f, { readdir, writeFileSync as w } from 'fs'
import p from 'path'

let l = [ 'pre-commit', 'prepare-commit-msg', 'commit-msg', 'post-commit', 'applypatch-msg', 'pre-applypatch', 'post-applypatch', 'pre-rebase', 'post-rewrite', 'post-checkout', 'post-merge', 'pre-push', 'pre-auto-gc' ],
	re = /^(#!\/usr\/bin\/env sh|\. "\$\(dirname -- "\$0"\)\/_\/husky\.sh")\r?\n/gm

export default (d = '.husky') => {
	if (process.env.HUSKY === '0') return 'HUSKY=0 skip install'
	if (d.includes('..')) return '.. not allowed'
	if (!f.existsSync('.git')) return `.git can't be found`

	let _ = (x = '') => p.join(d, '_', x)
	let { status: s, stderr: e } = c.spawnSync('git', ['config', 'core.hooksPath', `${d}/_`])
	if (s == null) return 'git command not found'
	if (s) return '' + e

	f.rmSync(_('husky.sh'), { force: true })
	l.forEach(h => {
		let hp = p.join(d, h)
		if (!f.existsSync(hp)) return
		let prev = f.readFileSync(hp, 'utf8')
		let next = prev.replace(re, '')
		if (prev !== next) console.log(`husky - removed deprecated code from ${hp}`)
		f.writeFileSync(hp, next)
	})

	f.mkdirSync(_(), { recursive: true })
	w(_('.gitignore'), '*')
	f.copyFileSync(new URL('husky', import.meta.url), _('h'))
	l.forEach(h => w(_(h), `#!/usr/bin/env sh\n. "\$(dirname "\$0")/h"`, { mode: 0o755 }))
	return ''
}