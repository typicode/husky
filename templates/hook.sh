#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

export GIT_PARAMS="$*"
{node} ./node_modules/husky/lib/runner/bin `basename "$0"`
