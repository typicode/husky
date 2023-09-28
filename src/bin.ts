#!/usr/bin/env node
import i from './index.js'

try {
  i(process.argv[2])
} catch (e) {
  console.error(e instanceof Error ? `husky - ${e.message}` : e)
  process.exit(1)
}
