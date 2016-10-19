// Run when package is installed
var fs       = require('fs')
var isCI     = require('is-ci')
var path     = require('path')
var husky    = require('../src/')
var hooks    = require('../src/hooks.json')

if (isCI) {
  console.log('\033[4;36m%s\033[0m', 'husky')
  console.log('CI detected, skipping Git hooks installation')
  return
}

console.log('\033[4;36m%s\033[0m', 'husky')
console.log('setting up hooks in .git/hooks')

function getPackageJson() {
  var filePath = process.cwd().split(path.sep);

  while(filePath.length > 1) {
    var search = path.join(filePath.join(path.sep), 'package.json');

    try {
      if (fs.statSync(search)) {
        var json = require(search)
        if (json.config && json.config.husky) {
          return json;
        }
      }
    } catch (e) {}

    filePath.pop();
  }

  return null;
}

husky.hooksDir(function(err, dir) {
  if (err) {
    console.error('  ' + err)
  } else {
    var json = getPackageJson();
    var config = json !== null && json.config && json.config.husky
      ? json.config.husky
      : {};

    hooks.forEach(function (hook) {
      script = hook.replace(/-/g, '')
      husky.create(dir, hook, script, config)
    })
    console.log('done\n')
  }
})
