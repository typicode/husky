#!/usr/bin/env node
import { add } from './commands/add'
import { install } from './commands/install'
import fs from 'fs'
import path from 'path'
import { PackageJson } from 'type-fest'

function readPkg(): PackageJson {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
  ) as PackageJson
}

const pkg = readPkg()

const [, , arg, ...params] = process.argv

function version() {
  console.log(pkg.version)
}

function help() {
  console.log(`Usage
  husky install [path from git root to package.json]
  husky add <hookname> [cmd]

Examples
  husky add pre-commit
  husky add pre-commit "npm test"
`)
}

if (arg === 'add') {
  add({
    cwd: process.cwd(),
    hookName: params[0],
    cmd: params[1],
  })
} else if (arg === 'install') {
  install({
    cwd: process.cwd(),
    dir: params[0],
  })
} else if (['--version', '-v'].includes(arg)) {
  version()
} else {
  help()
}
