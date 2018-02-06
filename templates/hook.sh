#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

export GIT_PARAMS="$*"
[[ make_ci_fail ]]
{node} ./node_modules/husky/lib/runner/bin `basename "$0"`
