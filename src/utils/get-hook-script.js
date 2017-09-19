'use strict'

const normalize = require('normalize-path')
const stripIndent = require('strip-indent')
const pkg = require('../../package.json')

module.exports = function getHookScript(hookName, relativePath, npmScriptName) {
  // On Windows normalize path (i.e. convert \ to /)
  const normalizedPath = normalize(relativePath)

  const noVerifyMessage = hookName === 'prepare-commit-msg'
    ? '(cannot be bypassed with --no-verify due to Git specs)'
    : '(add --no-verify to bypass)'

  return [
    stripIndent(
      `
      #!/bin/sh
      #husky ${pkg.version}

      command_exists () {
        command -v "$1" >/dev/null 2>&1
      }

      has_hook_script () {
        [ -f package.json ] && cat package.json | grep -q "\\"$1\\"[[:space:]]*:"
      }

      is_osx_or_linux () {
        OS=\`uname -s\`
        [[ "$OS" == "Darwin" || "$OS" == "Linux" ]]
      }

      # OS X and Linux only
      load_nvm () {
        # If nvm is not loaded, load it
        command_exists nvm || {
          export NVM_DIR="$HOME/.nvm"
          [ -s "$1/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
        }
      }

      # OS X and Linux only
      run_nvm () {
        # If nvm has been loaded correctly, use project .nvmrc
        command_exists nvm && [ -f .nvmrc ] && nvm use
      }

      cd "${normalizedPath}"

      # Check if ${npmScriptName} script is defined, skip if not
      has_hook_script ${npmScriptName} || exit 0

      if is_osx_or_linux
      then
        # Add common path where Node can be found
        # Brew standard installation path /usr/local/bin
        # Node standard installation path /usr/local
        export PATH="$PATH:/usr/local/bin:/usr/local"

        load_nvm
        run_nvm
      else
        # Node standard installation
        export PATH="$PATH:/c/Program Files/nodejs"
      fi

      # Check that npm exists
      command_exists npm || {
        echo >&2 "husky > can't find npm in PATH, skipping ${npmScriptName} script in package.json"
        exit 0
      }

      # Export Git hook params
      export GIT_PARAMS="$*"

      # Run npm script
      echo "husky > npm run -s ${npmScriptName} (node \`node -v\`)"
      echo

      npm run -s ${npmScriptName} || {
        echo
        echo "husky > ${hookName} hook failed ${noVerifyMessage}"
        exit 1
      }
      `
    )
  ].join('\n')
}
