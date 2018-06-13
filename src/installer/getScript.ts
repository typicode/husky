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

// Render script
const render = ({ node, platform, script, version }: IContext) => `#!/bin/sh
${huskyIdentifier}
# v${version} ${platform}

HOOK_NAME=\`basename "$0"\`
if [ -f ${script} ]; then
  ${node} ${script} $HOOK_NAME "$*"
else
  echo "Can't find husky, skipping $HOOK_NAME hook"
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

  const script = slash(
    path.join(path.relative(rootDir, huskyDir), 'lib/runner/bin')
  )

  return render({ node, platform, script, version })
}
