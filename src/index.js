var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var normalize = require('normalize-path')
var findParentDir = require('find-parent-dir')
var hooks = require('./hooks.json')


function write (filename, data) {
  fs.writeFileSync(filename, data)
  fs.chmodSync(filename, 0755)
}

function isHusky (filename) {
  var data = fs.readFileSync(filename, 'utf-8')
  return data.indexOf('# husky') !== -1
}

function findHooksDir (dirname) {
  var dir = findParentDir.sync(dirname, '.git')
  var gitDir = path.join(dir, '.git')
  var stats = fs.lstatSync(gitDir)

  if (stats.isFile()) {
    gitDir = fs.readFileSync(gitDir, 'utf-8')
  }

  return path.join(gitDir, 'hooks')
}

function getHookScript (hookName, relativePath, cmd) {
    // On Windows normalize path (i.e. convert \ to /)
  var normalizedPath = normalize(relativePath)

  // Hook script
  var arr = [
    '#!/bin/sh',
    '# husky'
  ]

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
      // Test if npm is not already in path
      'if ! [ command -v npm >/dev/null 2>&1 ];',
      'then',
      // Test if nvm is in PATH and load version specified by .nvmrc
      '  command -v nvm >/dev/null 2>&1 && [ -f .nvmrc ] && nvm use',
      'fi'
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
    '  echo "husky - ' + hookName + ' hook failed (add --no-verify to bypass)"',
    '  echo',
    '  exit 1',
    'fi',
    ''
  ])

  return arr.join('\n')
}

function createHook (fromDir, hooksDir, hookName, cmd) {
  var filename = path.join(hooksDir, hookName)

  // Assuming that this file is in node_modules/husky/src
  var packageDir = path.join(fromDir, '..', '..', '..')

  // Get project directory based on hooks directory
  // For example for /some/project/.git/hooks should be /some/project
  var projectDir = findParentDir.sync(hooksDir, '.git')

  // In order to support projects with package.json in a different directory
  // than .git, find relative path from project directory to package.json
  var relativePath = path.relative(hooksDir, packageDir)

  var hookScript = getHookScript(hookName, relativePath, cmd)

  // Create hooks directory if needed
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir)

  if (!fs.existsSync(filename)) {
    write(filename, hookScript)
  } else {
    if (isHusky(filename)) {
      write(filename, hookScript)
    } else {
      console.log('skipping .git/hooks/' + hookName + ' (existing user hook)')
    }
  }
}

function remove (dir, name) {
  var filename = dir + '/' + name

  if (fs.existsSync(filename) && this.isHusky(filename)) {
    fs.unlinkSync(dir + '/' + name)
  }
}

function installFrom (fromDir) {
  try {
    var hooksDir = findHooksDir(fromDir)
    hooks.forEach(function (hookName) {
      npmScriptName = hookName.replace(/-/g, '')
      createHook(fromDir, hooksDir, hookName, npmScriptName)
    })
    console.log('done\n')
  } catch (e) {
    console.error(e)
  }
}

function uninstallFrom (dir) {
  try {
    var hooksDir = husky.hooksDir()
    if (!err) {
      hooks.forEach(function (hook) {
        husky.remove(hooksDir, hook)
      })
      console.log('done\n')
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  installFrom: installFrom,
  uninstallFrom: uninstallFrom
}