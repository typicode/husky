import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as slash from 'slash'
import { huskyIdentifier } from './getScript'

interface IContext {
  node: string
  platform: string
  script: string
  version: string
}

// Used to identify scripts created by Husky
export const huskyAppendIdentifier = `${huskyIdentifier}-append`

// Render script
const render = ({ node, platform, script, version }: IContext) => `#!/bin/sh
${huskyAppendIdentifier} start!
# v${version} ${platform}
hookName=\`basename "$0"\`
appendScriptPath="${script}.js"
selfPath="$(cd -P -- "$(dirname -- "$0")" && pwd -P)/$(basename -- "$0")"
${
  platform !== 'win32'
    ? `
if ! command -v node >/dev/null 2>&1; then
  echo "Can't find node in PATH, trying to find a node binary on your system"
fi
`
    : ''
}
if [ -f $appendScriptPath ]; then
  ${node} $appendScriptPath $selfPath $* || exit $?
else
  echo "Can't find user's $hookName hook"
fi
${huskyAppendIdentifier} end!
`

export function remove(data: string): string {
  const regx = new RegExp(
    `${huskyAppendIdentifier} start![^]+?${huskyAppendIdentifier} end!`,
    'g'
  )
  return data.replace(regx, '')
}

/**
 * @param rootDir - e.g. /home/typicode/project/
 * @param huskyDir - e.g. /home/typicode/project/node_modules/husky/
 * @param requireRunNodePath - path to run-node resolved by require e.g. /home/typicode/project/node_modules/.bin/run-node
 * @param platform - platform husky installer is running on (used to produce win32 specific script)
 */
export default function(
  rootDir: string,
  huskyDir: string,
  requireRunNodePath: string = require.resolve('.bin/run-node'),
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
    path.join(path.relative(rootDir, huskyDir), 'lib/runner/append-bin')
  )

  return render({ node, platform, script, version })
}
