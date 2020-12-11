#!/usr/bin/env node
import { add } from './commands/add'
import { install } from './commands/install'
import { uninstall } from './commands/uninstall'
import fs from 'fs'
import path from 'path'
import { PackageJson } from 'type-fest'

function readPkg(): PackageJson {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
  ) as PackageJson
}

const pkg = readPkg()

const [, , arg, ...params] = process.argv

function version() {
  console.log(pkg.version)
}

function help() {
  console.log(`Usage

  husky install [dir] (default: .husky)
  husky uninstall
  husky add <file> [cmd]

Examples

  husky install
  husky install .config/husky

  husky add .husky/pre-commit
  husky add .husky/pre-commit "npm test"
  husky add .config/husky/pre-commit "npm test"
`)
}

switch (arg) {
  case 'install': {
    if (params.length > 2) {
      help()
      process.exit(2)
    }
    install(params[0])
    break
  }
  case 'uninstall': {
    uninstall()
    break
  }
  case 'add': {
    if (params.length === 0 || params.length > 2) {
      help()
      process.exit(2)
    }
    add(params[0], params[1])
    break
  }
  case '--version': {
    version()
    break
  }
  case '-v': {
    version()
    break
  }
  default:
    help()
}
