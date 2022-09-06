#!/usr/bin/env node
import p = require('path')
import h = require('./')

// Show usage and exit with code
function help(code: number) {
  console.log(`Usage:
<<<<<<< HEAD
  husky install [dir] (default: .husky)
=======
  husky install [dir] (default: .husky) [env] (default sh)
>>>>>>> 364de37ca2f0a20a802c02caf4798e3f78487f31
  husky uninstall
  husky set|add <file> [cmd]`)
  process.exit(code)
}

// Get CLI arguments
const [, , cmd, ...args] = process.argv
const ln = args.length
const [x, y] = args

// Set or add command in hook
const hook = (fn: (a1: string, a2: string) => void) => (): void =>
<<<<<<< HEAD
  // Show usage if no arguments are provided or more than 2
=======
  // Show usage if no arguments are provided or more than 3
>>>>>>> 364de37ca2f0a20a802c02caf4798e3f78487f31
  !ln || ln > 2 ? help(2) : fn(x, y)

// CLI commands
const cmds: { [key: string]: () => void } = {
<<<<<<< HEAD
  install: (): void => (ln > 1 ? help(2) : h.install(x)),
=======
  install: (): void => (ln > 2 ? help(2) : h.install(x, y)),
>>>>>>> 364de37ca2f0a20a802c02caf4798e3f78487f31
  uninstall: h.uninstall,
  set: hook(h.set),
  add: hook(h.add),
  ['-v']: () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
    console.log(require(p.join(__dirname, '../package.json')).version),
}

// Run CLI
try {
  // Run command or show usage for unknown command
  cmds[cmd] ? cmds[cmd]() : help(0)
} catch (e) {
  console.error(e instanceof Error ? `husky - ${e.message}` : e)
  process.exit(1)
}
