'use strict'

const normalize = require('normalize-path')
const stripIndent = require('strip-indent')
const pkg = require('../../package.json')

function platformSpecific() {
  // On OS X and Linux, try to use nvm if it's installed
  if (process.platform === 'win32') {
    // Add
    // Node standard installation path /c/Program Files/nodejs
    // for GUI apps
    // https://github.com/typicode/husky/issues/49
    return 'export PATH="$PATH:/c/Program Files/nodejs"'
  } else {
    // Add
    // Brew standard installation path /usr/local/bin
    // Node standard installation path /usr/local
    // for GUI apps
    // https://github.com/typicode/husky/issues/49
    const arr = [
      stripIndent(`
        load_nvm () {
          export $1=$2
          command_exists nvm || [ -s "$2/nvm.sh" ] && . $2/nvm.sh
          command_exists nvm && [ -f .nvmrc ] && nvm use
        }

        export PATH=$PATH:/usr/local/bin:/usr/local`)
    ]

    if (process.platform === 'darwin') {
      // Load nvm with BREW_NVM_DIR set to /usr/local/opt/nvm
      arr.push('load_nvm BREW_NVM_DIR /usr/local/opt/nvm')
    }

    // Load nvm with NVM_DIR set to $HOME/.nvm
    // ~ is unavaible, so $HOME is used
    arr.push(`load_nvm NVM_DIR ${process.env.HOME}/.nvm`)
    return arr.join('\n')
  }
}

module.exports = function getHookScript(hookName, relativePath, npmScriptName) {
  // On Windows normalize path (i.e. convert \ to /)
  const normalizedPath = normalize(relativePath)

  const noVerifyMessage = hookName === 'prepare-commit-msg'
    ? '(cannot be bypassed with --no-verify due to Git specs)'
    : '(add --no-verify to bypass)'

  // Hook script
  return [
    stripIndent(
      `
      #!/bin/sh
      #husky ${pkg.version}

      command_exists () {
        command -v "$1" >/dev/null 2>&1
      }

      # https://github.com/typicode/husky/issues/76
      has_hook_script () {
        [ -f package.json ] && cat package.json | grep -q "\\"$1\\"[[:space:]]*:"
      }

      cd ${normalizedPath}

      has_hook_script ${npmScriptName} || exit 0`
    ).trim(),
    platformSpecific(),
    stripIndent(
      `
      command_exists npm || {
        echo >&2 "husky > Can't find npm in PATH. Skipping ${npmScriptName} script in package.json"
        exit 0
      }

      # Expose GIT params
      export GIT_PARAMS="$*"

      # Run script
      echo "husky > npm run -s ${npmScriptName} (node \`node -v\`)"
      echo
      npm run -s ${npmScriptName} || {
        echo
        echo "husky > ${hookName} hook failed ${noVerifyMessage}"
        exit 1
      }`
    ).trim()
  ].join('\n')
}
