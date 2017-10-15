import del from 'del'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as tempy from 'tempy'
import index from '../'

describe('run', () => {
  it('should run working command and return 0 status', () => {
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

    const status = index([, , 'pre-commit'], { cwd: dir })
    expect(status).toBe(0)
  })

  // This shouldn't happen since the shell script checks for command existence
  // but in case there's a false positive, we're testing this also
  it('should return 0 status if the command is undefined', () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {}
      })
    )

    const status = index([, , 'pre-commit'], { cwd: dir })
    expect(status).toBe(0)
  })

  it('should run failing command and return 1 status', () => {
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

    const status = index([, , 'pre-commit'], { cwd: dir })
    expect(status).toBe(1)
  })

  it('should support old scripts but show a deprecated message', () => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        scripts: {
          precommit: 'echo success'
        }
      })
    )

    const status = index([, , 'pre-commit'], { cwd: dir })
    expect(status).toBe(0)
  })
})
