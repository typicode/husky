var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var normalize = require('normalize-path')

module.exports = {
  isHusky: function (filename) {
    var data = fs.readFileSync(filename, 'utf-8')
    return data.indexOf('# husky') !== -1
  },

  hooksDir: function (callback) {
    exec('git rev-parse --git-dir', function (error, stdout, stderr) {
      if (error) {
        callback(stderr, null)
      } else {
        callback(null, stdout.trim() + '/hooks')
      }
    })
  },

  write: function (filename, data) {
    fs.writeFileSync(filename, data)
    fs.chmodSync(filename, 0755)
  },

  create: function (dir, name, cmd) {
    var filename = dir + '/' + name
    var arr = [
      '#!/bin/sh',
      '# husky'
    ]

    // Needed on OS X / Linux when nvm is used and committing from Sublime Text
    if (process.platform !== 'win32') {
      arr.push('PATH="' + process.env.PATH + '"')
    }

    // Assuming that this file is in node_modules/husky/src
    var packageDir = path.join(__dirname, '..', '..', '..')

    // dir being .git/hooks
    var projectDir = path.join(dir, '..', '..')

    // In order to support projects with package.json in a different directory
    // than .git, find relative path from project directory to package.json
    var relativePath = path.join('.', path.relative(projectDir, packageDir))

    // On Windows normalize path (i.e. convert \ to /)
    var normalizedPath = normalize(relativePath)

    // Hook script
    arr = arr.concat([
      'cd ' + normalizedPath,
      // Fix for issue #16 #24
      // Test if script is defined in package.json
      '[ -f package.json ] && cat package.json | grep -q \'"' + cmd + '"\\s*:\'',
      // package.json or script can't be found exit
      '[ $? -ne 0 ] && exit 0',
      'npm run ' + cmd,
      'if [ $? -ne 0 ]; then',
      '  echo',
      '  echo "husky - ' + name + ' hook failed (add --no-verify to bypass)"',
      '  echo',
      '  exit 1',
      'fi'
    ])

    // Create hooks directory if needed
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)

    // Create hook file
    var data = arr.join('\n')
    if (!fs.existsSync(filename)) {
      this.write(filename, data)
    } else {
      if (this.isHusky(filename)) {
        this.write(filename, data)
      } else {
        console.log('  skipping .git/hooks/' + name + ' (existing user hook)')
      }
    }
  },

  remove: function (dir, name) {
    var filename = dir + '/' + name

    if (fs.existsSync(filename) && this.isHusky(filename)) {
      fs.unlinkSync(dir + '/' + name)
    }
  }
}
