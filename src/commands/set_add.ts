import fs from 'fs'
import path from 'path'

import { l } from '../log'

function data(cmd: string) {
  return `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

${cmd}
`
}

// Show "./file" instead of just "file"
function format(file: string): string {
  return `${path.dirname(file)}${path.sep}${path.basename(file)}`
}

export function set(file: string, cmd: string): void {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    throw new Error(
      `can't create hook, ${dir} directory doesn't exist (try running husky install)`,
    )
  }

  fs.writeFileSync(file, data(cmd), { mode: 0o0755 })

  l(`created ${format(file)}`)
}

export function add(file: string, cmd: string): void {
  if (fs.existsSync(file)) {
    fs.appendFileSync(file, `${cmd}\n`)
    l(`updated ${format(file)}`)
  } else {
    set(file, cmd)
  }
}
