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
    ])

    // On OS X and Linux, try to use nvm if it's installed
    if (process.platform !== 'win32') {
      // ~ is unavaible, so $HOME is used
      var home = process.env.HOME

      // This will load default Node version or version specified by .nvmrc
      arr = arr.concat([
        'export NVM_DIR="' + home + '/.nvm"'
      ])

      if (process.platform === 'darwin') {
        // If nvm was installed using homebrew,
        // nvm script will be found in /usr/local/opt/nvm
        arr = arr.concat([
          'BREW_NVM_DIR="/usr/local/opt/nvm"',
          '[ -s "$BREW_NVM_DIR/nvm.sh" ] && . "$BREW_NVM_DIR/nvm.sh"'
        ])

        // Add
        // Brew standard installation path /use/local/bin
        // Node standard installation path /usr/local
        // for GUI apps
        // https://github.com/typicode/husky/issues/49
        arr = arr.concat([
          'export PATH=$PATH:/usr/local/bin:/usr/local'
        ])
      }

      arr = arr.concat([
        // If nvm was installed using install script,
        // nvm script will be found in $NVM_DIR
        '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
        // Test if nvm is in PATH and load version specified by .nvmrc
        'command -v nvm >/dev/null 2>&1 && [ -f .nvmrc ] && nvm use'
      ])
    } else {
      // Add
      // Node standard installation path /c/Program Files/nodejs
      // for GUI apps
      // https://github.com/typicode/husky/issues/49
      arr = arr.concat([
        'export PATH="$PATH:/c/Program Files/nodejs"'
      ])
    }

    // Can't find npm message
    var npmNotFound = 'husky - can\'t find npm in PATH. Skipping ' + cmd + ' script in package.json'

    arr = arr.concat([
      // Test if npm is in PATH
      'command -v npm >/dev/null 2>&1 || { echo >&2 "' + npmNotFound + '"; exit 0; }',

      // Run script
      'export GIT_PARAMS="$*"',
      'npm run ' + cmd,
      'if [ $? -ne 0 ]; then',
      '  echo',
      '  echo "husky - ' + name + ' hook failed (add --no-verify to bypass)"',
      '  echo',
      '  exit 1',
      'fi',
      ''
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
        console.log('skipping .git/hooks/' + name + ' (existing user hook)')
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
