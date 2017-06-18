'use strict'

// Run when package is installed
const path = require('path')
const isCI = require('is-ci')
const installFrom = require('../src/install')

console.log('husky')

if (isCI) {
  console.log('CI detected, skipping Git hooks installation')
  process.exit(0)
}

console.log('setting up Git hooks')

const huskyDir = path.join(__dirname, '..')
installFrom(huskyDir)
