// Run when package is uninstalled
const path = require('path')
const uninstallFrom = require('../src/uninstall')

console.log('husky - uninstalling')

const huskyDir = path.join(__dirname, '..')
uninstallFrom(huskyDir)
