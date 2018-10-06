import * as del from 'del'
import * as execa from 'execa'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as os from 'os'
import * as path from 'path'

import getAppendScript, {
  huskyAppendIdentifier,
  remove
} from '../getAppendScript'
import { getUserStagedFilename } from '../index'

const rootDir = '/home/typicode/project'
const huskyDir = '/home/typicode/project/node_modules/husky'

const localTmpDir = path.join(__dirname, '../../../tmp')
const curHuskyDir = path.join(__dirname, '../../..')

// On OS X/Linux runNodePath gets resolved to the following value
// In order to make the test deterministic on AppVeyor, the value is hardcoded
const runNodePath = '/home/typicode/project/node_modules/run-node/run-node'

let tmpDir: string

function getFilename(name: string) {
  return path.join(tmpDir, name)
}

function execSync(
  filename: string,
  argsOrOptions: string[] | object,
  options?: object
) {
  if (Array.isArray(argsOrOptions)) {
    return execa.sync(path.join(tmpDir, filename), argsOrOptions, options)
  }
  return execa.sync(path.join(tmpDir, filename), argsOrOptions)
}

function writeFile(filename: string, data: string) {
  const fullname = path.join(tmpDir, filename)
  mkdirp.sync(path.dirname(fullname))
  fs.writeFileSync(fullname, data)
}

function writeExecFile(filename: string, data: string) {
  writeFile(filename, data)
  fs.chmodSync(path.join(tmpDir, filename), parseInt('0755', 8))
}

function readFile(filename: string) {
  return fs.readFileSync(path.join(tmpDir, filename), 'utf-8')
}

describe('getAppendScript', () => {
  beforeEach(() => {
    delete process.env.INIT_CWD
    tmpDir = localTmpDir
  })
  afterEach(() => del(tmpDir, { force: true }))

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
    const script = getAppendScript(tmpDir, curHuskyDir)
    writeExecFile('script.sh', script)
    expect(readFile('script.sh')).toContain(huskyAppendIdentifier)
    execSync('script.sh', ['777', 'sss'], { stdio: 'inherit', cwd: tmpDir })
    // Verify removing
    expect(readFile('script.sh')).not.toContain(huskyAppendIdentifier)
  })

  const test = os.platform() === 'win32' ? it.skip : it
  test('should run well', () => {
    const script = getAppendScript(tmpDir, curHuskyDir)
    writeExecFile('script.sh', script)
    writeExecFile(
      getUserStagedFilename('script.sh'),
      `echo $*\necho $* > ${getFilename('echoed')}`
    )
    execSync('script.sh', ['777', 'sss'], { stdio: 'inherit', cwd: tmpDir })

    expect(readFile('script.sh')).toContain(huskyAppendIdentifier)
    expect(readFile('echoed')).toEqual('777 sss\n')
  })
})
