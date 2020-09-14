import fs from 'fs'
import path from 'path'

const hooksDir = '.husky'

function getHookFile(cwd: string, hookName: string): string {
  return path.join(cwd, hooksDir, hookName)
}

function makeHookExecutable(cwd: string, hookName: string): void {
  const hookFile = getHookFile(cwd, hookName)
  fs.chmodSync(hookFile, 0o0755)
}

function createHookFile(cwd: string, hookName: string, cmd: string) {
  const filename = getHookFile(cwd, hookName)

  if (fs.existsSync(filename)) {
    throw new Error(`${hookName} already exists`)
  }

  const data = [
    '#!/bin/sh',
    '. "$(dirname $0)/_/husky.sh"',
    '',
    cmd,
  ].join('\n')
  fs.writeFileSync(filename, data, 'utf-8')
}

export function add({
  cwd,
  hookName,
  cmd,
}: {
  cwd: string
  hookName: string
  cmd: string
}): void {
  createHookFile(cwd, hookName, cmd)
  makeHookExecutable(cwd, hookName)
}
