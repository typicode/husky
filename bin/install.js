'use strict'

// Run when package is installed
const path = require('path')
const isCI = require('is-ci')
const installFrom = require('../src/install')

console.log('husky')

if (isCI && !process.env.HUSKY_IGNORE_CI) {
  console.log('CI detected, skipping Git hooks installation')
  process.exit(0)
}

if (process.env.HUSKY_SKIP_INSTALL) {
  console.log(`env variable HUSKY_SKIP_INSTALL is set to ${process.env.HUSKY_SKIP_INSTALL}, skipping Git hooks installation`)
  process.exit(0)
}

console.log('setting up Git hooks')

const huskyDir = path.join(__dirname, '..')
installFrom(huskyDir)
