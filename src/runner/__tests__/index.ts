import del from 'del'
import * as execa from 'execa'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as tempy from 'tempy'
import index from '../'

function getScriptPath(dir) {
  return path.join(dir, 'node_modules/husky/runner/index.js')
}

describe('run', () => {
  beforeEach(() => {
    jest.spyOn(execa, 'shellSync')
  })

  afterEach(() => {
    execa.shellSync.mockReset()
    execa.shellSync.mockRestore()
  })

  it('should run working command and return 0 status', async () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {
          hooks: {
            'pre-commit': 'echo success'
          }
        }
      })
    )

    const status = await index([, getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it('should run working command and return 0 status when husky is installed in a sub directory', async () => {
    const dir = tempy.directory()
    const subDir = path.join(dir, 'A/B')
    mkdirp.sync(subDir)

    fs.writeFileSync(
      path.join(subDir, 'package.json'),
      JSON.stringify({
        husky: {
          hooks: {
            'pre-commit': 'echo success'
          }
        }
      })
    )

    const status = await index([, getScriptPath(subDir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: subDir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  // This shouldn't happen since the shell script checks for command existence
  // but in case there's a false positive, we're testing this also
  it('should return 0 status if the command is undefined', async () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {}
      })
    )

    const status = await index([, getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).not.toBeCalled()
    expect(status).toBe(0)
  })

  it('should run failing command and return 1 status', async () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {
          hooks: {
            'pre-commit': 'echo fail && exit 2'
          }
        }
      })
    )

    const status = await index([, getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo fail && exit 2', {
      cwd: dir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(2)
  })

  it('should support old scripts but show a deprecated message', async () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        scripts: {
          precommit: 'echo success'
        }
      })
    )

    const status = await index([, getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it('should set HUSKY_GIT_STDIN env for some hooks', async () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {
          hooks: {
            'pre-push': 'echo success'
          }
        }
      })
    )

    const status = await index([, getScriptPath(dir), 'pre-push'], () =>
      Promise.resolve('foo')
    )
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {
        HUSKY_GIT_STDIN: 'foo'
      },
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it('should set GIT_PARAMS', async () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {
          hooks: {
            'commit-msg': 'echo success'
          }
        }
      })
    )

    const status = await index([, getScriptPath(dir), 'commit-msg', 'params'])

    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {
        GIT_PARAMS: 'params'
      },
      stdio: 'inherit'
    })

    const status = await index([, getScriptPath(dir), 'pre-commit'])
    expect(status).toBe(0)
  })
})
