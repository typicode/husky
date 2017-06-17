// Run when package is installed
const path = require('path')
const isCI = require('is-ci')
const installFrom = require('../src/install')

if (isCI) {
  console.log('husky - CI detected, skipping Git hooks installation')
  process.exit(0)
}

console.log('husky - setting up Git hooks')

const huskyDir = path.join(__dirname, '..')
installFrom(huskyDir)
