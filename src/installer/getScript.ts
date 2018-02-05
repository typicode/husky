import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as pupa from 'pupa'
import * as slash from 'slash'

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

export default function(
  userDir: string,
  // Additional params used for testing
  requireRunNodePath: string = require.resolve('.bin/run-node'),
  platform: string = os.platform()
) {
  const runNodePath = slash(path.relative(userDir, requireRunNodePath))

  // On Windows do not rely on run-node
  const node = platform === 'win32' ? 'node' : runNodePath

  const { version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
  )

  const template = fs.readFileSync(
    path.join(__dirname, '../../templates/hook.sh'),
    'utf-8'
  )

  return pupa(template, { huskyIdentifier, node, platform, version })
}
