#!/usr/bin/env node
import i from './index.js'
let d = c => console.error(`${c} command is deprecated`)
let a = process.argv[2]
if (['add', 'set', 'uninstall'].includes(a)) { d(a); process.exit(1) }
if (a == 'install') d(a)
process.stdout.write(i(a == 'install' ? undefined : a))