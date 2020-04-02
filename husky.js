/* eslint-disable */
// @ts-ignore
const pleaseUpgradeNode = require('please-upgrade-node')
const pkg = require('./package.json')

// Node version isn't supported, skip install
pleaseUpgradeNode(pkg, {
  exitCode: 0,
  message: function(requiredVersion) {
    return (
      'Husky requires Node ' +
      requiredVersion +
      ' (runtime: ' + process.version + ')' +
      ', skipping Git hooks installation.'
    )
  }
})

// Node version is supported, continue
try {
  require('./lib/installer/bin')
} catch (e) {
  console.log('missing lib directory')
}
