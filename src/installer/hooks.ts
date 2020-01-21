import fs = require('fs')
import path = require('path')
import { isGhooks, isPreCommit, isHusky, isYorkie } from './is'
import { getBanner } from './getBanner'

export const huskyIdentifier = '# husky'

export function getHookScript(): string {
  return `#!/bin/sh
${huskyIdentifier}

${getBanner()}

. "$(dirname "$0")/husky.sh"
`
}

const hookList = [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'pre-merge-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-receive',
  'update',
  'post-receive',
  'post-update',
  'push-to-checkout',
  'pre-auto-gc',
  'post-rewrite',
  'sendemail-validate'
]

function getHooks(gitHooksDir: string): string[] {
  return hookList.map((hookName: string): string =>
    path.join(gitHooksDir, hookName)
  )
}

function writeHook(filename: string, script: string): void {
  fs.writeFileSync(filename, script, 'utf-8')
  fs.chmodSync(filename, 0o0755)
}

function createHook(filename: string): void {
  const name = path.basename(filename)
  const hookScript = getHookScript()

  // Check if hook exist
  if (fs.existsSync(filename)) {
    const hook = fs.readFileSync(filename, 'utf-8')

    // Migrate
    if (isGhooks(hook)) {
      console.log(`migrating existing ghooks script: ${name}`)
      return writeHook(filename, hookScript)
    }

    // Migrate
    if (isPreCommit(hook)) {
      console.log(`migrating existing pre-commit script: ${name}`)
      return writeHook(filename, hookScript)
    }

    // Update
    if (isHusky(hook) || isYorkie(hook)) {
      return writeHook(filename, hookScript)
    }

    // Skip
    console.log(`skipping existing user hook: ${name}`)
    return
  }

  // Create hook if it doesn't exist
  writeHook(filename, hookScript)
}

export function createHooks(gitHooksDir: string): void {
  getHooks(gitHooksDir).forEach(createHook)
}

function canRemove(filename: string): boolean {
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename, 'utf-8')
    return isHusky(data)
  }

  return false
}

function removeHook(filename: string): void {
  fs.unlinkSync(filename)
}

export function removeHooks(gitHooksDir: string): void {
  getHooks(gitHooksDir)
    .filter(canRemove)
    .forEach(removeHook)
}
