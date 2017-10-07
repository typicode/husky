// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

export default `#!/bin/sh
${huskyIdentifier}
pwd
sh ./node_modules/husky/scripts/run.sh
`
