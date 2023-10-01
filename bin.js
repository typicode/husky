#!/usr/bin/env node
import i from './index.js'
let d = process.argv[2]
process.stdout.write(i(d == 'install' ? undefined : d))