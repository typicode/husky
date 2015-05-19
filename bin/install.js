// Run when package is installed
var fs    = require('fs')
var husky = require('../src/')

console.log('\033[36m%s\033[0m', 'husky')
console.log('  setting up hooks in .git/hooks/')

husky.hooksDir(function(err, dir) {
  if (err) {
    console.error('  ' + err)
  } else {
    husky.create(dir, 'pre-commit', 'precommit')
    husky.create(dir, 'pre-push', 'prepush')
    husky.create(dir, 'post-merge', 'postmerge')
    husky.create(dir, 'post-rewrite', 'postrewrite')
    husky.create(dir, 'pre-rebase', 'prerebase')

    console.log('  done\n')
  }
})
