#!/usr/bin/env node
import f, { writeFileSync as w } from 'fs'
import i from './index.js'

let a = process.argv[2]

if (a == 'init') {
	let p = 'package.json'
	let s = f.readFileSync(p);
	let d = JSON.parse(s)
		; (d.scripts ||= {}).prepare = 'husky'
	w('package.json', JSON.stringify(d, null, /\t/.test(s) ? '\t' : 2) + '\n')
	process.stdout.write(i())
	try { f.mkdirSync('.husky') } catch { }
	w('.husky/pre-commit', process.env.npm_config_user_agent.split('/')[0] + ' test\n')
	process.exit()
}

let d = c => console.error(`${c} command is deprecated`)
if (['add', 'set', 'uninstall'].includes(a)) { d(a); process.exit(1) }
if (a == 'install') d(a)

process.stdout.write(i(a == 'install' ? undefined : a))
