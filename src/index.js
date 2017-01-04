var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var normalize = require('normalize-path')
var findParentDir = require('find-parent-dir')
var hooks = require('./hooks.json')
var pkg = require('../package.json')

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

  if (dir) {
    var gitDir = path.join(dir, '.git')
    var stats = fs.lstatSync(gitDir)

    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      gitDir = fs
        .readFileSync(gitDir, 'utf-8')
        .split(':')[1]
        .trim()

      return path.join(dir, gitDir, 'hooks')
    }

    return path.join(gitDir, 'hooks')
  }
}

function getHookScript (hookName, relativePath, cmd) {
    // On Windows normalize path (i.e. convert \ to /)
  var normalizedPath = normalize(relativePath)

  // Hook script
  var arr = [
    '#!/bin/sh',
    '# husky ' + pkg.version,
    ''
  ]

  arr = arr.concat([
    'cd ' + normalizedPath,
    // Fix for issue #16 #24
    // Test if script is defined in package.json
    '[ -f package.json ] && cat package.json | grep -q \'"' + cmd + '"\\s*:\'',
    // package.json or script can't be found exit
    '[ $? -ne 0 ] && exit 0',
    ''
  ])

  // On OS X and Linux, try to use nvm if it's installed
  if (process.platform !== 'win32') {
    // ~ is unavaible, so $HOME is used
    var home = process.env.HOME

    if (process.platform === 'darwin') {
      // Add
      // Brew standard installation path /use/local/bin
      // Node standard installation path /usr/local
      // for GUI apps
      // https://github.com/typicode/husky/issues/49
      arr = arr.concat([
        'export PATH=$PATH:/usr/local/bin:/usr/local'
      ])
    }

    if (process.platform === 'darwin') {
      arr = arr.concat([
        'if ! [ command -v npm >/dev/null 2>&1 ];',
        'then',
        '  BREW_NVM_DIR="/usr/local/opt/nvm"',
        '  [ -s "$BREW_NVM_DIR/nvm.sh" ] && . "$BREW_NVM_DIR/nvm.sh"',
        '  command -v nvm >/dev/null 2>&1 && [ -f .nvmrc ] && nvm use',
        'fi',
        ''
      ])
    }

    arr = arr.concat([
      // Test if npm is not already in path
      // If npm isn't in path, try to load it using nvm
      'if ! [ command -v npm >/dev/null 2>&1 ];',
      'then',
      // If nvm was installed using install script, nvm script will be found in $NVM_DIR
      '  export NVM_DIR="' + home + '/.nvm"',
      // This will load default Node version or version specified by .nvmrc
      '  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
      // Test if nvm is in PATH and load version specified by .nvmrc
      '  command -v nvm >/dev/null 2>&1 && [ -f .nvmrc ] && nvm use',
      'fi',
      ''
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

function createHook (huskyDir, hooksDir, hookName, cmd) {
  var filename = path.join(hooksDir, hookName)

  // Assuming that this file is in node_modules/husky
  var packageDir = path.join(huskyDir, '..', '..')

  // Get project directory
  // When used in submodule, the project dir is the first .git that is found
  var projectDir = findParentDir.sync(huskyDir, '.git')

  // In order to support projects with package.json in a different directory
  // than .git, find relative path from project directory to package.json
  var relativePath = path.join('.', path.relative(projectDir, packageDir))

  var hookScript = getHookScript(hookName, relativePath, cmd)

  // Create hooks directory if needed
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir)

  if (!fs.existsSync(filename)) {
    write(filename, hookScript)
  } else {
    if (isHusky(filename)) {
      write(filename, hookScript)
    } else {
      console.log('skipping ' + hookName + ' hook (existing user hook)')
    }
  }
}

function removeHook (dir, name) {
  var filename = dir + '/' + name

  if (fs.existsSync(filename) && isHusky(filename)) {
    fs.unlinkSync(dir + '/' + name)
  }
}

function installFrom (huskyDir) {
  try {
    var hooksDir = findHooksDir(huskyDir)

    if (hooksDir) {
      hooks.forEach(function (hookName) {
        npmScriptName = hookName.replace(/-/g, '')
        createHook(huskyDir, hooksDir, hookName, npmScriptName)
      })
      console.log('done\n')
    } else {
      console.log('Can\'t find .git directory, skipping Git hooks installation')
    }
  } catch (e) {
    console.error(e)
  }
}

function uninstallFrom (huskyDir) {
  try {
    var hooksDir = findHooksDir(huskyDir)

    hooks.forEach(function (hookName) {
      removeHook(hooksDir, hookName)
    })
    console.log('done\n')
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  installFrom: installFrom,
  uninstallFrom: uninstallFrom
}
