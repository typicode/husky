// Run when package is uninstalled
var husky = require('../src/')

var dir = __dirname + '/../../../.git/hooks'

console.log('\033[36m%s\033[0m', 'husky')
console.log('  uninstalling')

husky.remove(dir, 'pre-commit')
husky.remove(dir, 'pre-push')

console.log('  done\n')