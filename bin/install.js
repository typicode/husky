// Run when package is installed
var path = require('path')
var isCI = require('is-ci')
var husky = require('../src/')

if (isCI) {
  console.log('\\033[4;36m%s\\033[0m', 'husky')
  console.log('CI detected, skipping Git hooks installation')
  process.exit(0)
}

console.log('\\033[4;36m%s\\033[0m', 'husky')
console.log('setting up hooks')

var huskyDir = path.join(__dirname, '..')
husky.installFrom(huskyDir)
