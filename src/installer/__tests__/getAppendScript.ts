import * as del from 'del'
import * as execa from 'execa'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as tempy from 'tempy'

import getAppendScript, {
  huskyAppendIdentifier,
  remove
} from '../getAppendScript'
import { getUserStagedFilename } from '../index'

const rootDir = '/home/typicode/project'
const huskyDir = '/home/typicode/project/node_modules/husky'

const curHuskyDir = path.join(__dirname, '../../..')

// On OS X/Linux runNodePath gets resolved to the following value
// In order to make the test deterministic on AppVeyor, the value is hardcoded
const runNodePath = '/home/typicode/project/node_modules/run-node/run-node'

let tempDir

function mkdir(dir: string) {
  mkdirp.sync(path.join(tempDir, dir))
}

function getFilename(name: string) {
  return path.join(tempDir, name)
}

function execSync(
  filename: string,
  argsOrOptions: string[] | object,
  options?: object
) {
  if (Array.isArray(argsOrOptions)) {
    return execa.sync(path.join(tempDir, filename), argsOrOptions, options)
  }
  return execa.sync(path.join(tempDir, filename), argsOrOptions)
}

function writeFile(filename: string, data: string) {
  fs.writeFileSync(path.join(tempDir, filename), data)
}

function writeExecFile(filename: string, data: string) {
  writeFile(filename, data)
  fs.chmodSync(path.join(tempDir, filename), parseInt('0755', 8))
}

function readFile(filename: string) {
  return fs.readFileSync(path.join(tempDir, filename), 'utf-8')
}

function exists(filename: string) {
  return fs.existsSync(path.join(tempDir, filename))
}

function readdir(filename: string) {
  return fs.readdirSync(path.join(tempDir, filename))
}

describe('getAppendScript', () => {
  beforeEach(() => {
    delete process.env.INIT_CWD
    tempDir = tempy.directory()
  })
  afterEach(() => del(tempDir, { force: true }))

  it('should match snapshot (OS X/Linux)', () => {
    const script = getAppendScript(rootDir, huskyDir, runNodePath, 'darwin')
    expect(script).toMatchSnapshot()
    expect(script).toMatch('run-node')
  })

  it('should match snapshot (Windows)', () => {
    const script = getAppendScript(rootDir, huskyDir, runNodePath, 'win32')

    expect(script).toMatchSnapshot()
    expect(script).not.toMatch('run-node')
  })

  it('should remove append wrapped', () => {
    expect(
      remove(
        [
          `${huskyAppendIdentifier} start!`,
          'asdasdsadasds',
          `${huskyAppendIdentifier} end!`
        ].join('\n')
      )
    ).toBe('')

    expect(
      remove(
        [
          ` ${huskyAppendIdentifier} start!`,
          'asdasdsadasds',
          `${huskyAppendIdentifier} end!?`
        ].join('\n')
      )
    ).toBe(' ?')

    expect(
      remove(
        [
          `${huskyAppendIdentifier} start!`,
          'asdasdsadasds',
          `${huskyAppendIdentifier} end!`,
          `${huskyAppendIdentifier} end!`
        ].join('\n')
      )
    ).toBe(`\n${huskyAppendIdentifier} end!`)

    expect(
      remove(
        [
          `${huskyAppendIdentifier} start!`,
          `${huskyAppendIdentifier} end!`,
          `${huskyAppendIdentifier} start!`,
          `${huskyAppendIdentifier} end!`
        ].join('\n')
      )
    ).toBe(`\n`)
  })

  it("should remove append wrapper when user's hook is not found", () => {
    const script = getAppendScript(tempDir, curHuskyDir)
    writeExecFile('script.sh', script)
    expect(readFile('script.sh')).toContain(huskyAppendIdentifier)
    console.log("readFile('script.sh')", readFile('script.sh'))
    execSync('script.sh', ['777', 'sss'], { stdio: 'inherit' })
    console.log("readFile('script.sh')", readFile('script.sh'))
    // Verify removing
    expect(readFile('script.sh')).not.toContain(huskyAppendIdentifier)
  })

  it('should run well', () => {
    const script = getAppendScript(tempDir, curHuskyDir)
    writeExecFile('script.sh', script)
    writeExecFile(
      getUserStagedFilename('script.sh'),
      `echo $* > ${getFilename('echoed')}`
    )
    execSync('script.sh', ['777', 'sss'], { stdio: 'inherit' })

    expect(readFile('script.sh')).toContain(huskyAppendIdentifier)
    console.log("readFile('echoed')", readFile('echoed'))
    expect(readFile('echoed')).toEqual('777 sss\n')
  })
})
