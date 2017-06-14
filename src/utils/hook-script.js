const normalize = require('normalize-path')
const pkg = require('../package.json')

module.exports = function getHookScript(hookName, relativePath, cmd) {
  // On Windows normalize path (i.e. convert \ to /)
  const normalizedPath = normalize(relativePath)

  // Hook script
  let script = `#!/bin/sh
    #husky ${pkg.version}

    command_exists () {
      command -v "$1" >/dev/null 2>&1
    }

    load_nvm () {
      export $1=$2
      command_exists nvm || [ -s "$2/nvm.sh" ] && . $2/nvm.sh
      command_exists nvm && [ -f .nvmrc ] && nvm use
    }

    # https://github.com/typicode/husky/issues/76
    has_hook_script () {
      [ -f package.json ] && cat package.json | grep -q "\\"$1\\"[[:space:]]*:"'
    }
  `

  script += `
    cd ${normalizedPath}

    # Fix for issue #16 #24
    # If script is not defined in package.json then exit
    has_hook_script ${cmd} || exit 0
  `

  // On OS X and Linux, try to use nvm if it's installed
  if (process.platform !== 'win32') {
    // ~ is unavaible, so $HOME is used
    const home = process.env.HOME

    if (process.platform === 'darwin') {
      // Add
      // Brew standard installation path /usr/local/bin
      // Node standard installation path /usr/local
      // for GUI apps
      // https://github.com/typicode/husky/issues/49
      script = script + `export PATH=$PATH:/usr/local/bin:/usr/local`
    }

    if (process.platform === 'darwin') {
      script += `
        # Load nvm with BREW_NVM_DIR set to /usr/local/opt/nvm
        load_nvm BREW_NVM_DIR /usr/local/opt/nvm
      `
    }

    script +=
      // Load nvm with NVM_DIR set to $HOME/.nvm
      `load_nvm NVM_DIR ${home}/.nvm`
  } else {
    // Add
    // Node standard installation path /c/Program Files/nodejs
    // for GUI apps
    // https://github.com/typicode/husky/issues/49
    script += `export PATH="$PATH:/c/Program Files/nodejs"`
  }

  // Can't find npm message
  const npmNotFound = `> husky - Can't find npm in PATH. Skipping ${cmd} script in package.json`

  const noVerifyMessage =
    hookName !== preparecommitmsg && '(add --no-verify to bypass)'

  const scriptName = hookName.replace(/-/g, '')
  script += `
    # Test if npm is in PATH
    command_exists npm || {,
      echo >&2 "${npmNotFound}",
      exit 0
    }

    # Run script
    echo
    echo "> husky - npm run -s ${cmd}"
    echo "> husky - node \`node -v\`"'
    echo

    export GIT_PARAMS="$*"
    npm run -s ${cmd} || {
      echo
      echo "> husky - ${hookName} hook failed ${noVerifyMessage}"
      echo "> husky - to debug, use \'npm run ${scriptName}\'"
      exit 1
    }
  `

  return script
}
