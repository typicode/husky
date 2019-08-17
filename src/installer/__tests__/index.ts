import del from 'del'
import fs from 'fs'
import mkdirp from 'mkdirp'
import os from 'os'
import path from 'path'
import tempy from 'tempy'
import * as installer from '../'
import { huskyIdentifier } from '../getScript'

// Temporary dir updated for each test
let tempDir: string

// Default values
const defaultGitDir = '.git'
const defaultGitHooksDir = '.git/hooks'
const defaultHookFilename = '.git/hooks/pre-commit'
const defaultHuskyDir = 'node_modules/husky'
const pkg = JSON.stringify({})

// Helpers
function install({
  topLevel,
  gitDir = defaultGitDir,
  huskyDir = defaultHuskyDir,
  requireRunNodePath,
  isCI = false
}: {
  topLevel?: string
  gitDir?: string
  huskyDir?: string
  requireRunNodePath?: string
  isCI?: boolean
} = {}): void {
  installer.install(
    topLevel || tempDir,
    path.join(tempDir, gitDir),
    path.join(tempDir, huskyDir),
    isCI,
    requireRunNodePath && path.join(tempDir, requireRunNodePath)
  )
}

function uninstall({
  gitDir = defaultGitDir,
  huskyDir = defaultHuskyDir
}: {
  gitDir?: string
  huskyDir?: string
} = {}): void {
  installer.uninstall(path.join(tempDir, gitDir), path.join(tempDir, huskyDir))
}

function mkdir(...dirs: string[]): void {
  dirs.forEach((dir): mkdirp.Made => mkdirp.sync(path.join(tempDir, dir)))
}

function writeFile(filename: string, data: string): void {
  fs.writeFileSync(path.join(tempDir, filename), data)
}

function readFile(filename: string): string {
  return fs.readFileSync(path.join(tempDir, filename), 'utf-8')
}

function exists(filename: string): boolean {
  return fs.existsSync(path.join(tempDir, filename))
}

function expectHookToExist(filename: string): void {
  const hook = readFile(filename)
  expect(hook).toMatch(huskyIdentifier)
}

// Tests
describe('install', (): void => {
  beforeEach((): void => {
    delete process.env.INIT_CWD
    tempDir = tempy.directory()
  })
  afterEach((): Promise<string[]> => del(tempDir, { force: true }))

  it('should install and uninstall', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)

    install()
    expectHookToExist(defaultHookFilename)

    const hook = readFile(defaultHookFilename)
    const node =
      os.platform() === 'win32' ? 'node' : 'node_modules/run-node/run-node'
    expect(hook).toMatch(node)

    uninstall()
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should install and uninstall with pnpm', (): void => {
    // Pnpm installs husky in node_modules/[..]/node_modules/husky
    // this tests ensures that husky will install from this path
    process.env.INIT_CWD = tempDir
    const huskyDir =
      'node_modules/.registry.npmjs.org/husky/1.0.0/node_modules/husky'

    mkdir(defaultGitHooksDir, huskyDir)
    writeFile('package.json', pkg)

    install({ huskyDir })
    expectHookToExist(defaultHookFilename)

    uninstall({ huskyDir })
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should update existing husky hooks', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)

    // Create an existing husky hook
    writeFile(defaultHookFilename, '# husky\nfoo')

    // Verify that it has been updated
    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toContain('# husky')
    expect(hook).not.toContain('foo')
  })

  it('should update existing husky hooks (v0.14 and earlier)', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)

    // Create an existing husky hook
    writeFile(defaultHookFilename, '#!/bin/sh\n#husky 0.14.3\nfoo')

    // Verify that it has been updated
    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toContain('# husky')
    expect(hook).not.toContain('foo')
  })

  it('should not modify user hooks', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)
    writeFile(defaultHookFilename, 'foo')

    // Verify that it's not overwritten
    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toBe('foo')

    // Verify that it's not deleted
    uninstall()
    expect(exists(defaultHookFilename)).toBeTruthy()
  })

  it('should support package.json installed in sub directory', (): void => {
    const huskyDir = 'A/B/node_modules/husky'
    const requireRunNodePath = 'A/B/node_modules/run-node/run-node'
    mkdir(defaultGitHooksDir, huskyDir)
    writeFile('A/B/package.json', pkg)

    install({
      huskyDir,
      requireRunNodePath
    })
    const hook = readFile('.git/hooks/pre-commit')

    const node =
      os.platform() === 'win32' ? 'node' : 'node_modules/run-node/run-node'
    expect(hook).toMatch(node)
    expect(hook).toMatch('A/B/node_modules/husky/run.js')

    uninstall({ huskyDir })
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should support git submodule', (): void => {
    const topLevel = 'A/B'
    const gitDir = '.git/modules/A/B'
    const huskyDir = 'A/B/node_modules/husky'
    const requireRunNodePath = 'A/B/node_modules/run-node/run-node'

    mkdir('.git/modules/A/B/hooks', huskyDir)
    writeFile('A/B/package.json', pkg)

    install({
      topLevel,
      gitDir,
      huskyDir,
      requireRunNodePath
    })
    const hook = readFile('.git/modules/A/B/hooks/pre-commit')

    expect(hook).toMatch('node_modules/husky/run.js')

    uninstall({ gitDir, huskyDir })
    expect(exists('.git/modules/A/B/hooks/pre-commit')).toBeFalsy()
  })

  it('should support git submodule and sub directory', (): void => {
    const topLevel = 'A/B'
    const gitDir = '.git/modules/A/B'
    const huskyDir = 'A/B/C/node_modules/husky'
    const requireRunNodePath = 'A/B/C/node_modules/run-node/run-node'

    mkdir('.git/modules/A/B/hooks', huskyDir)
    writeFile('A/B/C/package.json', pkg)

    install({ topLevel, gitDir, huskyDir, requireRunNodePath })
    const hook = readFile('.git/modules/A/B/hooks/pre-commit')

    expect(hook).toMatch('C/node_modules/husky/run.js')

    uninstall({ gitDir, huskyDir })
    expect(exists('.git/hooks/pre-push')).toBeFalsy()
  })

  it('should support git worktrees', (): void => {
    // TopLevel  A/B
    const gitDir = '.git/worktrees/B'
    const huskyDir = 'A/B/node_modules/husky'
    const requireRunNodePath = 'A/B/node_modules/run-node/run-node'

    mkdir(`${gitDir}/hooks`, huskyDir)
    writeFile('A/B/package.json', pkg)

    install({ gitDir, huskyDir, requireRunNodePath })

    const hook = readFile(`${gitDir}/hooks/pre-commit`)

    expect(hook).toMatch('node_modules/husky/run.js')

    uninstall({ gitDir, huskyDir })
    expect(exists('.git/worktrees/B/hooks/pre-commit')).toBeFalsy()
  })

  it('should support git worktrees with worktree outside', (): void => {
    const topLevel = 'project/B'
    const gitDir = 'project/A/.git/worktrees/B'
    const huskyDir = 'project/B/node_modules/husky'

    mkdir(gitDir, huskyDir)
    writeFile('project/B/package.json', pkg)

    install({
      topLevel,
      gitDir,
      huskyDir,
      requireRunNodePath: 'project/B/node_modules/run-node/run-node'
    })

    const hook = readFile('project/A/.git/worktrees/B/hooks/pre-commit')

    expect(hook).toMatch('node_modules/husky/run.js')

    uninstall({ gitDir, huskyDir })
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should not install from /node_modules/A/node_modules', (): void => {
    const huskyDir = 'node_modules/A/node_modules/husky'

    mkdir(defaultGitHooksDir, huskyDir)
    writeFile('node_modules/A/package.json', '{}')
    writeFile('package.json', pkg)

    install({ huskyDir })
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should not install from node_modules using INIT_CWD', (): void => {
    process.env.INIT_CWD = 'node_modules'
    mkdir(defaultGitHooksDir)
    writeFile('package.json', pkg)

    install()
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should migrate existing scripts (ghooks)', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)
    writeFile(
      defaultHookFilename,
      '// Generated by ghooks. Do not edit this file.'
    )

    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toMatch(huskyIdentifier)
  })

  it('should migrate existing scripts (pre-commit)', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)
    writeFile(defaultHookFilename, './node_modules/pre-commit/hook')

    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toMatch(huskyIdentifier)
  })

  it('should not install hooks in CI server', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', pkg)

    // By default isCI is false in husky's test
    install({ isCI: true })
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should install in CI server if skipCI is set to false', (): void => {
    mkdir(defaultGitHooksDir, defaultHuskyDir)
    writeFile('package.json', JSON.stringify({ husky: { skipCI: false } }))

    install()
    expect(exists(defaultHookFilename)).toBeTruthy()
  })

  it("should install even if .git/hooks doesn't exist", (): void => {
    mkdir(defaultGitDir, defaultHuskyDir)
    writeFile('package.json', pkg)

    install()
    expect(exists(defaultHookFilename)).toBeTruthy()
    expectHookToExist(defaultHookFilename)
  })
})
