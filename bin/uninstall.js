// Run when package is uninstalled
var husky = require('../src/')
var hooks = require('../hooks.json')

chalk.cyan('husky')
chalk.cyan('  uninstalling')

husky.hooksDir(function(err, dir) {
  if (!err) {
    hooks.forEach(function (hook) {
      husky.remove(dir, hook)
    })
    console.log('  done\n')
  }
})
