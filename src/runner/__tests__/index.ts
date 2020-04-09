import fs from 'fs'
import cp from 'child_process'
import path from 'path'
import tempy from 'tempy'
import index, { Env } from '../'

let spy: jest.SpyInstance

function expectSpawnSyncToHaveBeenCalledWith(
  cwd: string,
  cmd: string,
  env: Env = {}
): void {
  expect(cp.spawnSync).toHaveBeenCalledWith('sh', ['-c', cmd], {
    cwd,
    env: { ...process.env, ...env },
    stdio: 'inherit'
  })
}

describe('run', (): void => {
  beforeEach((): void => {
    spy = jest.spyOn(cp, 'spawnSync')
  })

  afterEach((): void => {
    spy.mockReset()
    spy.mockRestore()
  })

  it('should run command and return 0 status', async (): Promise<void> => {
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

    const status = await index(['', '', 'pre-commit'], { cwd: dir })
    expectSpawnSyncToHaveBeenCalledWith(dir, 'echo success')
    expect(status).toBe(0)
  })

  it('should return 0 status if no hooks are defined', async (): Promise<
    void
  > => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {}
      })
    )

    const status = await index(['', '', 'pre-commit'], { cwd: dir })
    expect(cp.spawnSync).not.toBeCalled()
    expect(status).toBe(0)
  })

  it('should return 1 status if the command is not found in PATH', async (): Promise<
    void
  > => {
    const dir = tempy.directory()

    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        husky: {
          hooks: {
            'pre-commit': 'cmdfoo'
          }
        }
      })
    )

    const status = await index(['', '', 'pre-commit'], { cwd: dir })
    expect(status).toBe(1)
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

    const status = await index(['', '', 'pre-commit'], { cwd: dir })
    expectSpawnSyncToHaveBeenCalledWith(dir, 'echo fail && exit 2')
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

    const status = await index(['', '', 'pre-commit'], { cwd: dir })
    expectSpawnSyncToHaveBeenCalledWith(dir, 'echo success')
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
    const status = await index(['', '', 'commit-msg', 'git fake param'], {
      cwd: dir
    })
    expectSpawnSyncToHaveBeenCalledWith(dir, 'echo success', {
      HUSKY_GIT_PARAMS: 'git fake param'
    })
    expect(status).toBe(0)
  })

  it("should not throw if there's no package.json", async (): Promise<void> => {
    const dir = tempy.directory()
    await index(['', '', 'pre-push'], {
      cwd: dir
    })
  })
})
