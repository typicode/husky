// Run when package is uninstalled
var path = require('path')
var husky = require('../src/')
var hooks = require('../src/hooks.json')

console.log('\033[4;36m%s\033[0m', 'husky')
console.log('uninstalling')

var huskyDir = path.join(__dirname, '..')
husky.uninstallFrom(huskyDir)