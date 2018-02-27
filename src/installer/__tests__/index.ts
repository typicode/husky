import * as del from 'del'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as tempy from 'tempy'
import { install, uninstall } from '../'
import { huskyIdentifier } from '../getScript'

let tempDir

const pkg = JSON.stringify({})

function installFrom(huskyDir: string, isCI = false) {
  install(path.join(tempDir, '.git'), path.join(tempDir, huskyDir), isCI)
}

function uninstallFrom(dir: string) {
  uninstall(path.join(tempDir, '.git'), path.join(tempDir, dir))
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
  beforeEach(() => (tempDir = tempy.directory()))
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

  it('should not install from /node_modules/A/node_modules', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/A/node_modules/husky')
    writeFile('node_modules/A/package.json', '{}')
    writeFile('package.json', pkg)

    installFrom('node_modules/A/node_modules/husky')
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

  it('should install hooks in outer the .git dir if HUSKY_ALLOW_INSTALL_OUTER=true', () => {
    mkdir('.git/hooks')
    mkdir('subdir/node_modules/husky')
    writeFile('package.json', pkg)

    process.env.HUSKY_ALLOW_INSTALL_OUTER = 'true'
    installFrom('subdir/node_modules/husky')
    delete process.env.HUSKY_ALLOW_INSTALL_OUTER
    expect(exists('.git/hooks/pre-commit')).toBeTruthy()
  })

  it('should not install hooks in CI server by default', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/husky')
    writeFile('package.json', pkg)

    const isCI = true
    installFrom('node_modules/husky', isCI)
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should install in CI server if skipCI is set to false', () => {
    mkdir('.git/hooks')
    mkdir('node_modules/husky')
    writeFile('package.json', JSON.stringify({ husky: { skipCI: false } }))

    const isCI = true
    installFrom('node_modules/husky', isCI)
    expect(exists('.git/hooks/pre-commit')).toBeTruthy()
  })
})
