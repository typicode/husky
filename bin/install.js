#!/usr/bin/env node
// Run when package is installed
var fs = require('fs')
var husky = require('../src/')

var dir = __dirname + '/../../../.git/hooks'

console.log('\033[36m%s\033[0m', 'husky')
console.log('  setting up hooks in .git/hooks/')

if (fs.existsSync(dir)) {
  husky.create(dir, 'pre-commit', 'npm run precommit')
  husky.create(dir, 'pre-push', 'npm run prepush')
  console.log('  done\n')
} else {
  console.log('  can\'t find .git/hooks/\n')
}