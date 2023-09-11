#!/usr/bin/env node
import u = require('util')
import i = require('./')

const { values } = u.parseArgs({
  args: process.argv.slice(2),
  options: {
    directory: {
      type: 'string',
      short: 'd',
    },
  },
  allowPositionals: false,
})

try {
  i.default(values.directory)
} catch (e) {
  console.error(e instanceof Error ? `husky - ${e.message}` : e)
  process.exit(1)
}
