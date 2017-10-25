#!/bin/bash
__huskyIdentifier__

hookname=`basename "$0"`
[ -f package.json ] && cat package.json | grep -q "\"$hookname\"[[:space:]]*:"

export GIT_PARAMS="$*"

if [[ $? -eq 0 ]]; then
  __runNode__ ./node_modules/husky/lib/runner/bin $hookname
  exit $?
fi 
