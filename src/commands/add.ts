import fs from 'fs'
import path from 'path'

function makeHookExecutable(file: string): void {
  fs.chmodSync(file, 0o0755)
}

function createHookFile(file: string, cmd: string) {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    throw new Error(`can't create hook, ${dir} directory doesn't exist`)
  }

  if (fs.existsSync(file)) {
    throw new Error(`${file} already exists`)
  }

  const data = [
    '#!/bin/sh',
    '. "$(dirname "$0")/_/husky.sh"',
    '',
    cmd,
    '',
  ].join('\n')

  fs.writeFileSync(file, data, 'utf-8')
  // Show "./file" instead of just "file"
  console.log(`husky - created ${dir}${path.sep}${path.basename(file)}`)
}

export function add(file: string, cmd: string): void {
  createHookFile(file, cmd)
  makeHookExecutable(file)
}
