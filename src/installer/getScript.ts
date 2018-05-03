import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as pupa from 'pupa'
import * as slash from 'slash'

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

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
  console.log({ rootDir, huskyDir, requireRunNodePath })
  const runNodePath = slash(path.relative(rootDir, requireRunNodePath))

  // On Windows do not rely on run-node
  const node = platform === 'win32' ? 'node' : runNodePath

  const { version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
  )

  const script = slash(
    path.join(path.relative(rootDir, huskyDir), 'lib/runner/bin')
  )

  const template = fs.readFileSync(
    path.join(__dirname, '../../templates/hook.sh'),
    'utf-8'
  )

  return pupa(template, { huskyIdentifier, node, platform, script, version })
}
