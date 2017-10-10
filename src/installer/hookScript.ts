import * as fs from 'fs'
import * as path from 'path'

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

export default fs
  .readFileSync(path.join(__dirname, '../../templates/hook.sh'), 'utf-8')
  .replace('__huskyIdentifier__', huskyIdentifier)
