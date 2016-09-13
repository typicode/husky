// Run when package is installed
var fs    = require('fs')
var isCI  = require('is-ci')
var husky = require('../src/')
var hooks = require('../src/hooks.json')

if (isCI) {
  console.log('\033[4;36m%s\033[0m', 'husky')
  console.log('CI detected, skipping Git hooks installation')
  return
}

console.log('\033[4;36m%s\033[0m', 'husky')
console.log('setting up hooks in .git/hooks')

husky.hooksDir(function(err, dir) {
  if (err) {
    console.error('  ' + err)
  } else {
    hooks.forEach(function (hook) {
      script = hook.replace(/-/g, '')
      husky.create(dir, hook, script)
    })
    console.log('done\n')
  }
})
