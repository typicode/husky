// Run when package is uninstalled
const path = require('path')
const chalk = require('chalk')
const uninstallFrom = require('../src/uninstall')

console.log(chalk.cyan.underline('husky'))
console.log('uninstalling')

const huskyDir = path.join(__dirname, '..')
uninstallFrom(huskyDir)
