#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

export GIT_PARAMS="$*"

hookname=`basename "$0"`

if [ -f package.json ] && cat package.json | grep -q "\"$hookname\"[[:space:]]*:"; then
  {node} ./node_modules/husky/lib/runner/bin $hookname
  exit $?
fi 
