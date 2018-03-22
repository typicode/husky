import del from 'del'
import * as execa from 'execa'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as tempy from 'tempy'
import index from '../'

jest.spyOn(execa, 'shellSync')

describe('run', () => {
  afterEach(() => {
    execa.shellSync.mockReset()
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

    const status = await index([, , 'pre-commit'], { cwd: dir })
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
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

    const status = await index([, , 'pre-commit'], { cwd: dir })
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
            'pre-commit': 'echo fail && exit 1'
          }
        }
      })
    )

    const status = await index([, , 'pre-commit'], { cwd: dir })
    expect(execa.shellSync).toHaveBeenCalledWith('echo fail && exit 1', {
      cwd: dir,
      stdio: 'inherit'
    })
    expect(status).toBe(1)
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

    const status = await index([, , 'pre-commit'], { cwd: dir })
    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })

  it('should set GIT_STDIN env for some hooks', async () => {
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

    process.stdin.isTTY = false
    process.stdin.push('foo')
    setTimeout(() => process.stdin.emit('end'))
    const status = await index([, , 'pre-push'], { cwd: dir })

    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {
        GIT_STDIN: 'foo'
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

    const status = await index([, , 'commit-msg', 'params'], { cwd: dir })

    expect(execa.shellSync).toHaveBeenCalledWith('echo success', {
      cwd: dir,
      env: {
        GIT_PARAMS: 'params'
      },
      stdio: 'inherit'
    })
    expect(status).toBe(0)
  })
})
