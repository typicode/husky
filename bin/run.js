#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const pleaseUpgradeNode = require('please-upgrade-node')
const pkg = require('../package.json')

// Node version isn't supported, skip
pleaseUpgradeNode(pkg, {
  message(requiredVersion) {
    return (
      'Husky requires Node ' +
      requiredVersion +
      ' (runtime: ' +
      process.version +
      ')' +
      ", can't run Git hook."
    )
  },
})

// Node version is supported, continue
require('../lib/runner/bin')
