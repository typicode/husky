import * as fs from 'fs'
import * as path from 'path'

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

export default function(userDir: string) {
  const runNodePath = path.join(
    '.',
    path.relative(userDir, require.resolve('.bin/run-node'))
  )
  return fs
    .readFileSync(path.join(__dirname, '../../templates/hook.sh'), 'utf-8')
    .replace('__huskyIdentifier__', huskyIdentifier)
    .replace('__runNode__', runNodePath)
}
