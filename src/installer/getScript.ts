import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as slash from 'slash'

interface IContext {
  node: string
  platform: string
  script: string
  version: string
}

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

// Experimental
const huskyrc = '~/.huskyrc'

// Render script
const render = ({ node, platform, script, version }: IContext) => `#!/bin/sh
${huskyIdentifier}
# v${version} ${platform}

scriptPath="${script}.js"
hookName=\`basename "$0"\`
gitParams="$*"

if [ "$\{HUSKY_DEBUG\}" = "true" ]; then
  echo "husky:debug $hookName hook started..."
fi
${
  platform !== 'win32'
    ? `
if ! command -v node >/dev/null 2>&1; then
  echo "Can't find node in PATH, trying to find a node binary on your system"
fi
`
    : ''
}
if [ -f $scriptPath ]; then
  [ -f ${huskyrc} ] && source ${huskyrc}
  ${node} $scriptPath $hookName "$gitParams"
else
  echo "Can't find Husky, skipping $hookName hook"
  echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
fi
`

/**
 * @param rootDir - e.g. /home/typicode/project/
 * @param huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param platform - platform husky installer is running on (used to produce win32 specific script)
 */
export default function(
  rootDir: string,
  huskyDir: string,
  requireRunNodePath: string,
  // Additional param used for testing only
  platform: string = os.platform()
) {
  const runNodePath = slash(path.relative(rootDir, requireRunNodePath))

  // On Windows do not rely on run-node
  const node = platform === 'win32' ? 'node' : runNodePath

  const { version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
  )

  const script = slash(path.join(path.relative(rootDir, huskyDir), 'run'))

  return render({ node, platform, script, version })
}
