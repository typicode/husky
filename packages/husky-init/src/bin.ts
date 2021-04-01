#!/usr/bin/env node
import fs = require('fs')
import { install, set } from 'husky'
import { PackageJson } from 'type-fest'

import { updatePkg } from '.'

const [, , arg] = process.argv

console.log('husky-init updating package.json')

// Read package.json
const str = fs.readFileSync('package.json', 'utf-8')
const pkg = JSON.parse(str) as PackageJson

// Update package.json
updatePkg(pkg, arg === '--yarn2')

// Write package.json
const regex = /^[ ]+|\t+/m
const indent = regex.exec(str)?.[0]
fs.writeFileSync('package.json', `${JSON.stringify(pkg, null, indent)}\n`)

// Install husky
install()

// Add pre-commit sample
set('.husky/pre-commit', 'npm test')

console.log()
console.log('please review changes in package.json')
