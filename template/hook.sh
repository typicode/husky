#!/bin/sh
__huskyIdentifier__

hookname=\`basename "$0"\`
[ -f package.json ] && cat package.json | grep -q "\\"$hookname\\"[[:space:]]*:"

if [[ $? -eq 0 ]]; then
  ./node_modules/.bin/run-node ./node_modules/husky/lib/run $hookname
  exit $?
fi