// Run when package is uninstalled
var husky = require('../src/')

console.log('\033[36m%s\033[0m', 'husky')
console.log('  uninstalling')

husky.hooksDir(function(err, dir) {
  if (!err) {
    husky.remove(dir, 'pre-commit')
    husky.remove(dir, 'post-commit')
    husky.remove(dir, 'pre-push')
    husky.remove(dir, 'post-merge')

    console.log('  done\n')
  }
})
