#!/usr/bin/env node
import f, { writeFileSync as w } from 'fs'
import i from './index.js'

let d = c => console.error(`${c} command is deprecated`)
let a = process.argv[2]
if (a == 'init') {
  let p = process.env.npm_package_json
  let d = JSON.parse(f.readFileSync(p))
  d.scripts.prepare = 'husky'
  w('package.json', JSON.stringify(d, null, /\t/.test() ? '\t' : 2))
  process.stdout.write(i())
  w('.husky/pre-commit', process.env.npm_config_user_agent.split('/')[0] + ' test')
  process.exit()
}
if (['add', 'set', 'uninstall'].includes(a)) { d(a); process.exit(1) }
if (a == 'install') d(a)
process.stdout.write(i(a == 'install' ? undefined : a))
