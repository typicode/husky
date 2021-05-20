#!/usr/bin/env node
import { readFileSync } from 'fs'
import { join } from 'path'
import { PackageJson } from 'type-fest'

import { add, install, set, uninstall } from './'

function readPkg(): PackageJson {
  return JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf-8'),
  ) as PackageJson
}

const pkg = readPkg()

const [, , cmd, ...args] = process.argv

function version() {
  console.log(pkg.version)
}

function help() {
  console.log(`Usage
  husky install [dir] (default: .husky)
  husky uninstall
  husky set|add <file> [cmd]`)
}

function misuse() {
  help()
  process.exit(2)
}

const cmds: { [key: string]: (...args: string[]) => void } = {
  install(dir: string): void {
    args.length > 1 ? misuse() : install(dir)
  },
  uninstall,
  set(...args) {
    args.length === 0 || args.length > 2 ? misuse() : set(args[0], args[1])
  },
  add(...args) {
    args.length === 0 || args.length > 2 ? misuse() : add(args[0], args[1])
  },
  '--version': version,
  '-v': version,
}

cmds[cmd] ? cmds[cmd](...args) : help()
