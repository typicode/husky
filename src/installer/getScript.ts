import fs from 'fs'
import os from 'os'
import path from 'path'
import slash from 'slash'

interface Context {
  createdAt: string
  homepage: string
  node: string
  pkgDirectory?: string
  pkgHomepage?: string
  platform: string
  runScriptPath: string
  version: string
}

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

// Experimental
const huskyrc = '~/.huskyrc'

// Render script
const render = ({
  createdAt,
  homepage,
  node,
  pkgDirectory,
  pkgHomepage,
  platform,
  runScriptPath,
  version
}: Context): string => `#!/bin/sh
${huskyIdentifier}

# Hook created by Husky
#   Version: ${version}
#   At: ${createdAt}
#   See: ${homepage}

# From
#   Directory: ${pkgDirectory}
#   Homepage: ${pkgHomepage}

scriptPath="${runScriptPath}.js"
hookName=\`basename "$0"\`
gitParams="$*"

debug() {
  [ "$\{HUSKY_DEBUG}" = "true" ] || [ "$\{HUSKY_DEBUG}" = "1" ] && echo "husky:debug $1"
}

debug "$hookName hook started..."
${
  platform === 'win32'
    ? ''
    : `
if ! command -v node >/dev/null 2>&1; then
  echo "Info: Can't find node in PATH, trying to find a node binary on your system"
fi
`
}
if [ -f "$scriptPath" ]; then
  # if [ -t 1 ]; then
  #   exec < /dev/tty
  # fi
  if [ -f ${huskyrc} ]; then
    debug "source ${huskyrc}"
    . ${huskyrc}
  fi
  ${node} "$scriptPath" $hookName "$gitParams"
else
  echo "Can't find Husky, skipping $hookName hook"
  echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
fi
`

/**
 * @param {string} rootDir - e.g. /home/typicode/project/
 * @param {string} huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param {string} requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param {string} platform - platform husky installer is running on (used to produce win32 specific script)
 * @returns {string} script
 */
export default function(
  rootDir: string,
  huskyDir: string,
  requireRunNodePath: string,
  // Additional param used for testing only
  platform: string = os.platform()
): string {
  const runNodePath = slash(path.relative(rootDir, requireRunNodePath))

  // On Windows do not rely on run-node
  const node = platform === 'win32' ? 'node' : runNodePath

  // Env variable
  const pkgHomepage = process && process.env && process.env.npm_package_homepage
  const pkgDirectory = process && process.env && process.env.PWD

  // Husky package.json
  const { homepage, version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
  )

  // Path to run.js
  const runScriptPath = slash(
    path.join(path.relative(rootDir, huskyDir), 'run')
  )

  // Created at
  const createdAt = new Date().toLocaleString()

  // Render script
  return render({
    createdAt,
    homepage,
    node,
    pkgDirectory,
    pkgHomepage,
    platform,
    runScriptPath,
    version
  })
}
