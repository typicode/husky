// Run when package is installed
var fs = require('fs')
var path = require('path')
var isCI = require('is-ci')
var husky = require('../src/')
var hooks = require('../src/hooks.json')

if (isCI) {
  console.log('\033[4;36m%s\033[0m', 'husky')
  console.log('CI detected, skipping Git hooks installation')
  return
}

console.log('\033[4;36m%s\033[0m', 'husky')
console.log('setting up hooks')

var huskyDir = path.join(__dirname, '..')
husky.installFrom(huskyDir)
