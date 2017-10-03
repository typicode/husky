// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

// Script template
const hookScript = `#!/bin/sh
${huskyIdentifier}

hookname=\`basename "$0"\`
[ -f package.json ] && cat package.json | grep -q "\\"$hookname\\"[[:space:]]*:"

if [[ $? -eq 0 ]]; then
  ./node_modules/.bin/run-node ./node_modules/husky/lib/run $hookname
  exit $?
fi
`

export default hookScript
