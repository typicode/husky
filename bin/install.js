#!/usr/bin/env node
// Run when package is installed
var husky = require('../src/')

var dir = __dirname + '/../../../.git/hooks'

console.log('\033[36m%s\033[0m', 'husky')
console.log('  setting up hooks in .git/hooks/')

husky.create(dir, 'pre-commit', 'npm run precommit')
husky.create(dir, 'pre-push', 'npm run prepush')

console.log('  done\n')