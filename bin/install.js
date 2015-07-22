// Run when package is installed
var fs    = require('fs')
var husky = require('../src/')
var hooks = require('../hooks.json')

console.log('\033[36m%s\033[0m', 'husky')
console.log('  setting up hooks in .git/hooks/')

husky.hooksDir(function(err, dir) {
  if (err) {
    console.error('  ' + err)
  } else {
    hooks.forEach(function (hook) {
      script = hook.replace(/-/g, '')
      husky.create(dir, hook, script)
    })
    console.log('  done\n')
  }
})
