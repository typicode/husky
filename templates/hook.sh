#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

read stdin
export GIT_STDIN="$stdin"
export GIT_PARAMS="$*"
{node} ./node_modules/husky/lib/runner/bin `basename "$0"`
