import execa from 'execa'
import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import tempy from 'tempy'
import index from '../'

let spy: jest.SpyInstance

function getScriptPath(dir: string): string {
  return path.join(dir, 'node_modules/husky/runner/index.js')
}

describe('run', (): void => {
  beforeEach(
    (): void => {
      spy = jest.spyOn(execa, 'shellSync')
    }
  )

  afterEach(
    (): void => {
      spy.mockReset()
      spy.mockRestore()
    }
  )

  it('should run working command and return 0 status', async (): Promise<
    void
  > => {
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

    const status = await index(['', getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it('should run working command and return 0 status when husky is installed in a sub directory', async (): Promise<
    void
  > => {
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

    const status = await index(['', getScriptPath(subDir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: subDir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  // This shouldn't happen since the shell script checks for command existence
  // but in case there's a false positive, we're testing this also
  it('should return 0 status if the command is undefined', async (): Promise<
    void
  > => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {}
      })
    )

    const status = await index(['', getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).not.toBeCalled()
    expect(status).toBe(0)
  })

  it('should run failing command and return 1 status', async (): Promise<
    void
  > => {
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

    const status = await index(['', getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo fail && exit 2', {
      cwd: dir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(2)
  })

  it('should support old scripts but show a deprecated message', async (): Promise<
    void
  > => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        scripts: {
          precommit: 'echo success'
        }
      })
    )

    const status = await index(['', getScriptPath(dir), 'pre-commit'])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {},
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it('should set HUSKY_GIT_STDIN env for some hooks', async (): Promise<
    void
  > => {
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

    const status = await index(
      ['', getScriptPath(dir), 'pre-push'],
      (): Promise<string> => Promise.resolve('foo')
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

  it('should set HUSKY_GIT_PARAMS', async (): Promise<void> => {
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

    // 'commit-msg' takes one parameter from git
    const status = await index([
      '',
      getScriptPath(dir),
      'commit-msg',
      'git fake param'
    ])
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {
        HUSKY_GIT_PARAMS: 'git fake param'
      },
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it("should not throw if there's no package.json", async (): Promise<void> => {
    const dir = tempy.directory()
    await index(
      ['', getScriptPath(dir), 'pre-push'],
      (): Promise<string> => Promise.resolve('foo')
    )
  })
})
