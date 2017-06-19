'use strict'

const getHookScript = require('../../src/utils/get-hook-script')

describe('getHookScript', () => {
  it('should render (win32)', () => {
    if (process.platform === 'win32') {
      process.env.HOME = 'C:\\users\\foo\\'
      expect(getHookScript('pre-commit', '.', 'precommit')).toMatchSnapshot()
    }
  })

  it('should render (darwin)', () => {
    if (process.platform === 'darwin') {
      process.env.HOME = '/users/foo'
      expect(getHookScript('pre-commit', '.', 'precommit')).toMatchSnapshot()
    }
  })
})
