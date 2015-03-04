var fs = require('fs')
var path = require('path')
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
    
    // Assuming that this file is in node_modules/husky/src
    var packageDir = path.join(__dirname, '..', '..', '..')

    // dir being .git/hooks
    var projectDir = path.join(dir, '..', '..')
    
    // In order to support projects with package.json in a different directory
    // than .git, find relative path from project directory to package.json
    var relativePath = path.join('.', path.relative(projectDir, packageDir))

    data +=
        'cd ' + relativePath + '\n'
      + 'npm run --json | grep -q \'"' + cmd + '":\'\n' // fix for issue #16
      + 'if [ $? -ne 0 ]; then\n'
      + '  exit 0\n' // package.scripts[name] can't be found exit
      + 'fi\n'
      + 'npm run ' + cmd + ' --silent\n'
      + 'if [ $? -ne 0 ]; then\n'
      + '  echo\n'
      + '  echo "husky - ' + name + ' hook failed (add --no-verify to bypass)"\n'
      + '  echo\n'
      + '  exit 1\n'
      + 'fi\n'

    // Create hooks directory if needed
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)

    // Create hook file
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
