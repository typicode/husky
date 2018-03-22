#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

{node} ./node_modules/husky/lib/runner/bin `basename "$0"` "$*"
