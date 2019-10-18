import del from 'del'
import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import tempy from 'tempy'
import './__env__'
import * as installer from '../'
import { huskyIdentifier } from '../getScript'

// RandomId to verify that scripts get updated
const randomId = Math.random().toString()

// Temporary dir updated for each test
let tempDir: string

// Default values
const defaultGitCommonDir = '.git'
const defaultPrefix = ''
const defaultGitHooksDir = '.git/hooks'
const defaultHookFilename = '.git/hooks/pre-commit'
const DEFAULT_INIT_CWD = '.'
const pkg = JSON.stringify({})

// Helpers
function install({
  gitCommonDir = defaultGitCommonDir,
  prefix = defaultPrefix,
  INIT_CWD = DEFAULT_INIT_CWD,
  isCI = false
}: {
  gitCommonDir?: string
  prefix?: string
  INIT_CWD?: string
  isCI?: boolean
} = {}): void {
  installer.install({
    gitCommonDir: path.join(tempDir, gitCommonDir),
    prefix,
    INIT_CWD: path.join(tempDir, INIT_CWD),
    pmName: 'npm',
    isCI
  })
}

function uninstall({
  gitCommonDir = defaultGitCommonDir,
  INIT_CWD = DEFAULT_INIT_CWD
}: {
  gitCommonDir?: string
  INIT_CWD?: string
} = {}): void {
  installer.uninstall({
    gitCommonDir: path.join(tempDir, gitCommonDir),
    INIT_CWD: path.join(tempDir, INIT_CWD)
  })
}

function mkdir(dirs: string[]): void {
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
    mkdir([defaultGitHooksDir, DEFAULT_INIT_CWD])
    writeFile('package.json', pkg)

    install()
    expectHookToExist(defaultHookFilename)

    const hook = readFile(defaultHookFilename)
    expect(hook).toMatch('cd "."')

    uninstall()
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should update existing husky hooks', (): void => {
    mkdir([defaultGitHooksDir, DEFAULT_INIT_CWD])
    writeFile('package.json', pkg)

    // Create an existing husky hook
    writeFile(defaultHookFilename, `# husky\n${randomId}`)

    // Verify that it has been updated
    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toContain('# husky')
    expect(hook).not.toContain(randomId)
  })

  it('should update existing husky hooks (v0.14 and earlier)', (): void => {
    mkdir([defaultGitHooksDir, DEFAULT_INIT_CWD])
    writeFile('package.json', pkg)

    // Create an existing husky hook
    writeFile(defaultHookFilename, `#!/bin/sh\n#husky 0.14.3\n${randomId}`)

    // Verify that it has been updated
    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toContain('# husky')
    expect(hook).not.toContain(randomId)
  })

  it('should not modify user hooks', (): void => {
    mkdir([defaultGitHooksDir, DEFAULT_INIT_CWD])
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

  it('should support install from sub directory', (): void => {
    // npm install can run from a sub directory,
    // and INIT_CWD can therefore not be the user package directory.
    // Husky need to be able find it nonetheless.
    const INIT_CWD = 'sub'
    mkdir([defaultGitHooksDir, INIT_CWD])
    writeFile('package.json', pkg)

    install({ INIT_CWD })
    const hook = readFile('.git/hooks/pre-commit')

    expect(hook).toMatch('cd "."')

    uninstall({ INIT_CWD })
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should support package.json installed in sub directory', (): void => {
    const prefix = 'A/B/'
    const INIT_CWD = 'A/B'
    mkdir([defaultGitHooksDir, INIT_CWD])
    writeFile('A/B/package.json', pkg)

    install({ prefix, INIT_CWD })
    const hook = readFile('.git/hooks/pre-commit')

    expect(hook).toMatch('cd "A/B/"')

    uninstall({ INIT_CWD })
    expect(exists('.git/hooks/pre-commit')).toBeFalsy()
  })

  it('should support git submodule', (): void => {
    const gitCommonDir = '.git/modules/A/B'
    const INIT_CWD = 'A/B'

    mkdir(['.git/modules/A/B/hooks', INIT_CWD])
    writeFile('A/B/package.json', pkg)

    install({
      gitCommonDir,
      INIT_CWD
    })
    const hook = readFile('.git/modules/A/B/hooks/pre-commit')

    expect(hook).toMatch('cd "."')

    uninstall({ gitCommonDir, INIT_CWD })
    expect(exists('.git/modules/A/B/hooks/pre-commit')).toBeFalsy()
  })

  it('should not install from node_modules/A', (): void => {
    const INIT_CWD = 'node_modules/A'

    mkdir([defaultGitHooksDir, INIT_CWD])
    writeFile('node_modules/A/package.json', '{}')
    writeFile('package.json', pkg)

    install({ INIT_CWD })
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should migrate existing scripts (ghooks)', (): void => {
    mkdir([defaultGitHooksDir])
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
    mkdir([defaultGitHooksDir])
    writeFile('package.json', pkg)
    writeFile(defaultHookFilename, './node_modules/pre-commit/hook')

    install()
    const hook = readFile(defaultHookFilename)
    expect(hook).toMatch(huskyIdentifier)
  })

  it('should not install hooks in CI server', (): void => {
    mkdir([defaultGitHooksDir])
    writeFile('package.json', pkg)

    // By default isCI is false in husky's test
    install({ isCI: true })
    expect(exists(defaultHookFilename)).toBeFalsy()
  })

  it('should install in CI server if skipCI is set to false', (): void => {
    mkdir([defaultGitHooksDir])
    writeFile('package.json', JSON.stringify({ husky: { skipCI: false } }))

    install()
    expect(exists(defaultHookFilename)).toBeTruthy()
  })

  it("should install even if .git/hooks doesn't exist", (): void => {
    // Create only Git common dir but hooks dir
    mkdir([defaultGitCommonDir])
    writeFile('package.json', pkg)

    install()
    expect(exists(defaultHookFilename)).toBeTruthy()
    expectHookToExist(defaultHookFilename)
  })
})
