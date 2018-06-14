import * as del from 'del'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as os from 'os'
import * as path from 'path'
import * as tempy from 'tempy'
import { install, uninstall } from '../'
import { huskyIdentifier } from '../getScript'

let tempDir

const pkg = JSON.stringify({})

function installFrom(
  huskyDir: string,
  requireRunNodePath?: string,
  isCI = false
) {
  install(
    path.join(tempDir, huskyDir),
    requireRunNodePath && path.join(tempDir, requireRunNodePath),
    isCI
  )
}

function uninstallFrom(dir: string) {
  uninstall(path.join(tempDir, dir))
}

function mkdir(dir: string) {
  mkdirp.sync(path.join(tempDir, dir))
}

function writeFile(filename: string, data: string) {
  fs.writeFileSync(path.join(tempDir, filename), data)
}

function readFile(filename: string) {
  return fs.readFileSync(path.join(tempDir, filename), 'utf-8')
}

function exists(filename: string) {
  return fs.existsSync(path.join(tempDir, filename))
}

function expectHookToExist(filename: string) {
  const hook = readFile(filename)
  expect(hook).toMatch(huskyIdentifier)
}

describe('install', () => {
  beforeEach(() => {
    delete process.env.INIT_CWD
    tempDir = tempy.directory()
  })
  afterEach(() => del(tempDir, { force: true }))

  it('should install and uninstall', () => {
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)

    installFrom(huskyDir)
    expectHookToExist(hookFilename)

    uninstallFrom(huskyDir)
    expect(exists(hookFilename)).toBeFalsy()
  })

  it('should install and uninstall with pnpm', () => {
    // pnpm installs husky in node_modules/.../node_modules/husky
    // this tests ensures that husky will install from this path
    process.env.INIT_CWD = tempDir
    const huskyDir =
      'node_modules/.registry.npmjs.org/husky/1.0.0/node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)

    installFrom(huskyDir)
    expectHookToExist(hookFilename)

    uninstallFrom(huskyDir)
    expect(exists(hookFilename)).toBeFalsy()
  })

  it('should update existing husky hooks', () => {
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)

    // Create an existing husky hook
    writeFile(hookFilename, '# husky\nfoo')

    // Verify that it has been updated
    installFrom(huskyDir)
    const hook = readFile(hookFilename)
    expect(hook).toContain('# husky')
    expect(hook).not.toContain('foo')
  })

  it('should update existing husky hooks (v0.14 and earlier)', () => {
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)

    // Create an existing husky hook
    writeFile(hookFilename, '#husky\nfoo')

    // Verify that it has been updated
    installFrom(huskyDir)
    const hook = readFile(hookFilename)
    expect(hook).toContain('# husky')
    expect(hook).not.toContain('foo')
  })

  it('should not modify user hooks', () => {
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-push'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)
    writeFile(hookFilename, 'foo')

    // Verify that it's not overwritten
    installFrom(huskyDir)
    const hook = readFile(hookFilename)
    expect(hook).toBe('foo')

    // Verify that it's not deleted
    uninstallFrom(huskyDir)
    expect(exists(hookFilename)).toBeTruthy()
  })

  it('should support package.json installed in sub directory', () => {
    mkdir('.git/hooks')
    mkdir('A/B/node_modules/husky')
    writeFile('A/B/package.json', pkg)

    installFrom('A/B/node_modules/husky', 'A/B/node_modules/.bin/run-node')
    const hook = readFile('.git/hooks/pre-commit')

    const node =
      os.platform() !== 'win32' ? 'A/B/node_modules/.bin/run-node' : 'node'
    expect(hook).toMatch(node)
    expect(hook).toMatch('A/B/node_modules/husky/lib/runner/bin.js')

    uninstallFrom('A/B/node_modules/husky')
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should support git submodule', () => {
    mkdir('.git/modules/A/B/hooks')
    mkdir('A/B/node_modules/husky')
    writeFile('A/B/package.json', pkg)
    writeFile('A/B/.git', 'git: ../../.git/modules/A/B')

    installFrom('A/B/node_modules/husky', 'A/B/node_modules/.bin/run-node')
    const hook = readFile('.git/modules/A/B/hooks/pre-commit')

    const node =
      os.platform() !== 'win32' ? 'node_modules/.bin/run-node' : 'node'
    expect(hook).toMatch(node)
    expect(hook).toMatch('node_modules/husky/lib/runner/bin.js')

    uninstallFrom('A/B/node_modules/husky')
    expect(exists('.git/modules/A/B/hooks/pre-commit')).toBeFalsy()
  })

  it('should support git submodule and sub directory', () => {
    mkdir('.git/modules/A/B/hooks')
    mkdir('A/B/C/node_modules/husky')
    writeFile('A/B/C/package.json', pkg)
    writeFile('A/B/.git', 'git: ../../.git/modules/A/B')

    installFrom('A/B/C/node_modules/husky', 'A/B/C/node_modules/.bin/run-node')
    const hook = readFile('.git/modules/A/B/hooks/pre-commit')

    const node =
      os.platform() !== 'win32' ? 'C/node_modules/.bin/run-node' : 'node'
    expect(hook).toMatch(node)
    expect(hook).toMatch('C/node_modules/husky/lib/runner/bin.js')

    uninstallFrom('A/B/C/node_modules/husky')
    expect(exists('.git/hooks/pre-push')).toBeFalsy()
  })

  it('should support git worktrees', () => {
    mkdir('.git/worktrees/B/hooks')
    mkdir('A/B/node_modules/husky')
    writeFile('A/B/package.json', pkg)
    // Git path for worktrees is absolute
    const absolutePath = path.join(tempDir, '.git/worktrees/B')
    writeFile('A/B/.git', `git: ${absolutePath}`)

    installFrom('A/B/node_modules/husky', 'A/B/node_modules/.bin/run-node')

    const hook = readFile('.git/worktrees/B/hooks/pre-commit')

    const node =
      os.platform() !== 'win32' ? 'node_modules/.bin/run-node' : 'node'
    expect(hook).toMatch(node)
    expect(hook).toMatch('node_modules/husky/lib/runner/bin.js')

    uninstallFrom('A/B/node_modules/husky')
    expect(exists('.git/worktrees/B/hooks/pre-commit')).toBeFalsy()
  })

  it('should not install from /node_modules/A/node_modules', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/A/node_modules/husky')
    writeFile('node_modules/A/package.json', '{}')
    writeFile('package.json', pkg)

    installFrom('node_modules/A/node_modules/husky')
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should not install from node_modules using INIT_CWD', () => {
    process.env.INIT_CWD = 'node_modules'
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'
    mkdir('.git/hooks')
    writeFile('package.json', pkg)

    installFrom(huskyDir)
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should migrate existing scripts (ghooks)', () => {
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)
    writeFile(hookFilename, '// Generated by ghooks. Do not edit this file.')

    installFrom(huskyDir)
    const hook = readFile(hookFilename)
    expect(hook).toMatch(huskyIdentifier)
  })

  it('should migrate existing scripts (pre-commit)', () => {
    const huskyDir = 'node_modules/husky'
    const hookFilename = '.git/hooks/pre-commit'

    mkdir('.git/hooks')
    mkdir(huskyDir)
    writeFile('package.json', pkg)
    writeFile(hookFilename, './node_modules/pre-commit/hook')

    installFrom(huskyDir)
    const hook = readFile(hookFilename)
    expect(hook).toMatch(huskyIdentifier)
  })

  it('should not install hooks if HUSKY_SKIP_INSTALL=true', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/husky')
    writeFile('package.json', pkg)

    process.env.HUSKY_SKIP_INSTALL = 'true'
    installFrom('node_modules/husky')
    delete process.env.HUSKY_SKIP_INSTALL
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should not install hooks in CI server by default', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/husky')
    writeFile('package.json', pkg)

    const isCI = true
    installFrom('node_modules/husky', undefined, isCI)
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should install in CI server if skipCI is set to false', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/husky')
    writeFile('package.json', JSON.stringify({ husky: { skipCI: false } }))

    const isCI = true
    installFrom('node_modules/husky', undefined, isCI)
    expect(exists('.git/hooks/pre-commit')).toBeTruthy()
  })

  it("should not crash if .git/hooks doesn't exist", () => {
    const huskyDir = 'node_modules/husky'

    mkdir('.git')
    mkdir(huskyDir)
    writeFile('package.json', pkg)

    expect(() => installFrom(huskyDir)).not.toThrow()
  })
})
