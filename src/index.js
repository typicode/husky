var fs   = require('fs')
var exec = require('child_process').exec

module.exports = {
  isHusky: function(filename) {
    var data = fs.readFileSync(filename, 'utf-8')
    return data.indexOf('# husky') !== -1
  },

  hooksDir: function(callback) {
    exec('git rev-parse --git-dir', function(error, stdout, stderr) {
      if (error) {
        callback(stderr, null)
      } else {
        callback(null, stdout.trim() + '/hooks')
      }
    })
  },

  write: function(filename, data) {
    fs.writeFileSync(filename, data)
    fs.chmodSync(filename, 0755)
  },

  create: function(dir, name, cmd) {
    var filename = dir + '/' + name
    var data =
        '#!/bin/sh\n'
      + '# husky\n'

    // Needed on OS X / Linux when nvm is used and committing from Sublime Text
    if (process.platform !== 'win32') {
      data += 'PATH="' + process.env.PATH + '"\n'
    }

    data +=
        cmd + '\n'
      + 'if [ $? -ne 0 ]; then\n'
      + '  echo\n'
      + '  echo "husky - ' + name + ' hook failed (add -n to bypass)"\n'
      + '  echo\n'
      + '  exit 1\n'
      + 'fi\n'


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

  remove: function(dir, name) {
    var filename = dir + '/' + name

    if (fs.existsSync(filename) && this.isHusky(filename)) {
      fs.unlinkSync(dir + '/' + name)
    }
  }
}
