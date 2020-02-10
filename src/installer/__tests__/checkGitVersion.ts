jest.mock('child_process')

import cp from 'child_process'
import { checkGitVersion } from '../checkGitVersion'

describe('checkGitVersion', (): void => {
  it('should throw an error if version <2.13.0', (): void => {
    // eslint-disable-next-line
    // @ts-ignore
    cp.spawnSync.mockReturnValue({
      status: 0,
      stdout: Buffer.from('git version 2.12.0')
    })
    expect(() => checkGitVersion()).toThrowError()
  })

  it('should not throw an error if version >=2.13.0', (): void => {
    // eslint-disable-next-line
    // @ts-ignore
    cp.spawnSync.mockReturnValue({
      status: 0,
      stdout: Buffer.from('git version 2.14.0')
    })
    expect(() => checkGitVersion()).not.toThrowError()
  })
})
