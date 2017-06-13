// Run when package is uninstalled
const path = require('path')
const chalk = require('chalk')
const husky = require('../src/')

console.log(chalk.cyan.underline('husky'))
console.log('uninstalling')

const huskyDir = path.join(__dirname, '..')
husky.uninstallFrom(huskyDir)
