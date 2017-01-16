// Run when package is installed
var path = require('path')
var chalk = require('chalk')
var isCI = require('is-ci')
var husky = require('../src/')

console.log(chalk.cyan.underline('husky'))

if (isCI) {
  console.log('CI detected, skipping Git hooks installation')
  process.exit(0)
}

console.log('setting up hooks')

var huskyDir = path.join(__dirname, '..')
husky.installFrom(huskyDir)
