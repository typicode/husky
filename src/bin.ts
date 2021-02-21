#!/usr/bin/env node
import { add } from './commands/add'
import { install } from './commands/install'
import { uninstall } from './commands/uninstall'
import fs from 'fs'
import path from 'path'
import { PackageJson } from 'type-fest'
import { init } from './commands/init'

function readPkg(): PackageJson {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
  ) as PackageJson
}

const pkg = readPkg()

const [, , cmd, ...args] = process.argv

function version() {
  console.log(pkg.version)
}

function help() {
  console.log(`Usage

  husky init
  husky install [dir] (default: .husky)
  husky uninstall
  husky add <file> [cmd]

Examples
  husky init

  husky install
  husky install .config/husky

  husky add .husky/pre-commit
  husky add .husky/pre-commit "npm test"
  husky add .config/husky/pre-commit "npm test"
`)
}

switch (cmd) {
  case 'init': {
    init()
    break
  }
  case 'install': {
    if (args.length > 2) {
      help()
      process.exit(2)
    }
    install(args[0])
    break
  }
  case 'uninstall': {
    uninstall()
    break
  }
  case 'add': {
    if (args.length === 0 || args.length > 2) {
      help()
      process.exit(2)
    }
    add(args[0], args[1])
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
