// Run when package is installed
var fs    = require('fs')
var husky = require('../src/')
var hooks = require('../hooks.json')
var chalk  = require('chalk')

chalk.cyan('husky');
chalk.cyan('  setting up hooks in .git/hooks/')

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
