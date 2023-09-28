#!/usr/bin/env node
import u from 'util'
import i from './index.js'

const { values: v } = u.parseArgs({
  args: process.argv.slice(2),
  options: {
    dir: {
      type: 'string',
      short: 'd',
    },
  },
  allowPositionals: false,
})

try {
  i(v.dir)
} catch (e) {
  console.error(e instanceof Error ? `husky - ${e.message}` : e)
  process.exit(1)
}
