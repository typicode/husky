// Run when package is uninstalled
var husky = require('../src/')

console.log('\033[36m%s\033[0m', 'husky')
console.log('  uninstalling')

husky.hooksDir(function(err, dir) {
  if (!err) {
    husky.remove(dir, 'pre-commit')
    husky.remove(dir, 'pre-push')
    husky.remove(dir, 'post-merge')
    husky.remove(dir, 'post-rewrite')
    husky.remove(dir, 'pre-rebase')

    console.log('  done\n')
  }
})
