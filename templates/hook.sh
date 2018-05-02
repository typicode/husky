#!/bin/sh
{huskyIdentifier}
# v{version} {platform}

export HUSKY_GIT_PARAMS="$*"
{node} {script} `basename "$0"`
