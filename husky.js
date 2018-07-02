// This code must work with at least Node 0.12 that's why it's outside of src/
const pleaseUpgradeNode = require('please-upgrade-node')
const pkg = require('./package.json')

// Don't try to install if Node version doesn't satisfy package.engines.node version
pleaseUpgradeNode(pkg, {
  exitCode: 0,
  message: function(requiredVersion) {
    return 'Husky requires Node ' + requiredVersion + ', skipping Git hooks installation.'
  }
})

// Node version is supported, install
require('./lib/installer/bin').default()
