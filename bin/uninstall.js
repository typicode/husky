// Run when package is uninstalled
var path = require('path')
var chalk = require('chalk')
var husky = require('../src/')

console.log(chalk.cyan.underline('husky'))
console.log('uninstalling')

var huskyDir = path.join(__dirname, '..')
husky.uninstallFrom(huskyDir)
