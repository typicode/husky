'use strict'

const normalize = require('normalize-path')
const stripIndent = require('strip-indent')
const pkg = require('../../package.json')

function gitPlatformSpecific() {
  // On OS X and Linux, try to use nvm if it's installed
  if (process.platform === 'win32') {
    // Add
    // Node standard installation path /c/Program Files/nodejs
    // for GUI apps
    // https://github.com/typicode/husky/issues/49
    return stripIndent(
      `
      # Node standard installation
      export PATH="$PATH:/c/Program Files/nodejs"`
    )
  } else {
    // Using normalize to support ' in path
    // https://github.com/typicode/husky/issues/117
    const home = normalize(process.env.HOME)

    return stripIndent(
      `
        # Add common path where Node can be found
        # Brew standard installation path /usr/local/bin
        # Node standard installation path /usr/local
        export PATH="$PATH:/usr/local/bin:/usr/local"

        # Try to load nvm using path of standard installation
        load_nvm ${home}/.nvm
        run_nvm`
    )

    return arr.join('\n')
  }
}

function hgPlatformSpecific() {
  // On OS X and Linux, try to use nvm if it's installed
  if (process.platform === 'win32') {
    // Add
    // Node standard installation path /c/Program Files/nodejs
    // for GUI apps
    // https://github.com/typicode/husky/issues/49
    return stripIndent(
      ``
    )
  } else {
    // Using normalize to support ' in path
    // https://github.com/typicode/husky/issues/117
    const home = normalize(process.env.HOME)

    return stripIndent(
      `
    # comment for indent
      # use nvm (if available)
      use_nvm('${home}/.nvm')`
    )

    return arr.join('\n')
  }
}

module.exports = function getHookScript(vcs, hookName, relativePath, npmScriptName) {
  // On Windows normalize path (i.e. convert \ to /)
  const normalizedPath = normalize(relativePath)
  const isGit = vcs.name === 'git'

  const preCommitMsgHookName = isGit ? 'prepare-commit-msg' : 'pretxncommit'
  const verifyMessage =
    hookName === preCommitMsgHookName
      ? '(cannot be bypassed with --no-verify due to Git specs)'
      : '(add --no-verify to bypass)'

  return isGit 
    ? createGitScript(normalizedPath, hookName, npmScriptName, verifyMessage)
    : createHgScript(normalizedPath, hookName, npmScriptName, verifyMessage);
}

function createGitScript(normalizedPath, hookName, npmScriptName, verifyMessage) {
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

      # OS X and Linux only
      load_nvm () {
        # If nvm is not loaded, load it
        command_exists nvm || {
          export NVM_DIR="$1"
          [ -s "$1/nvm.sh" ] && . "$1/nvm.sh"
        }
      }

      # OS X and Linux only
      run_nvm () {
        # If nvm has been loaded correctly, use project .nvmrc
        command_exists nvm && [ -f .nvmrc ] && nvm use
      }

      cd "${normalizedPath}"

      # Check if ${npmScriptName} script is defined, skip if not
      has_hook_script ${npmScriptName} || exit 0`
    ).trim(),

    gitPlatformSpecific(),

    stripIndent(
      `
      # Check that npm exists
      command_exists npm || {
        echo >&2 "husky > can't find npm in PATH, skipping ${npmScriptName} script in package.json"
        exit 0
      }

      # Export VCS hook params
      export GIT_PARAMS="$*"

      # Run npm script
      echo "husky > npm run -s ${npmScriptName} (node \`node -v\`)"
      echo

      npm run -s ${npmScriptName} || {
        echo
        echo "husky > ${hookName} hook failed ${verifyMessage}"
        exit 1
      }
      `
    )
  ].join('\n')
}

function createHgScript(normalizedPath, hookName, npmScriptName, verifyMessage)
{
  return [
    stripIndent(
      `
        #!/usr/bin/python
        #husky ${pkg.version}
        import os
        import sys
        import re
        import subprocess

        pfx = 'husky > '

        def print_msg(msg):
          print pfx + msg

        def print_error_msg(msg):
          print >> sys.stderr, pfx + msg

        def has_cmd(cmd):
          def is_exe(fp):
            return os.path.isfile(fp) and os.access(fp, os.X_OK)

          fp, fn = os.path.split(cmd)

          if fp:
            if is_exe(cmd):
              return True
          else:
            for path in os.environ['PATH'].split(os.pathsep):
              fn = os.path.join(path, cmd)
              if is_exe(fn):
                return True

          return False

        def execute_cmd(cmd, show_output = False):
          try:
            FNULL = os.open(os.devnull, os.O_WRONLY)
            if show_output:
              return subprocess.check_call(cmd, stdin=FNULL, shell=True) == 0
            else:
              return subprocess.check_call(cmd, stdin=FNULL, stdout=FNULL, stderr=FNULL, shell=True) == 0
          except (OSError, subprocess.CalledProcessError) as e:
            print_error_msg(str(e))
            return False

        def has_hook_script(hookName):
          if re.search('"' + hookName + '"\\s*:', open('package.json').read()):
            return True
          return False

        def has_file(fn):
          return os.path.isfile(fn)

        def use_nvm(fn):
          # if no project file is here, return
          if has_file('.nvmrc') is False:
            return

          # if nvm is in PATH, use it
          if has_cmd('nvm') is True:
            execute_cmd(['nvm', 'use'])
            return

          # with a shell, try to source it
          execute_cmd(['sh', '-c', 'source ' + fn + ' && nvm use'])


        def execute_hook(ui, repo, hooktype, **kwargs):
          os.chdir('${normalizedPath}')

          # check if a precommit hook is set
          if has_hook_script('${npmScriptName}') is False:
            return False`
    ).trim(),

    hgPlatformSpecific(),

    stripIndent(
      `
    # comment for indent
      # check if npm is available
      if has_cmd('npm') is False:
        print_error_msg('can\\'t find npm in PATH, skipping precommit script in package.json')
        return True

      # export arguments for husky
      os.environ['HG_ARGS'] = ' '.join(sys.argv)

      npm_cmd = ['npm', 'run', '-s', '${npmScriptName}']
      print_msg(' '.join(npm_cmd) + '\\n')

      if execute_cmd(npm_cmd, True) is False:
        print_error_msg('${hookName} hook failed ${verifyMessage}')
        return True`
    )
  ].join('\n')
}
