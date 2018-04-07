#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

unset GIT_DIR
export GIT_PARAMS="$*"
{node} ./node_modules/husky/lib/runner/bin `basename "$0"`
