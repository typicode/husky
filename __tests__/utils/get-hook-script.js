const getHookScript = require('../../src/utils/get-hook-script')

describe('getHookScript', () => {
  it('should render', () => {
    expect(getHookScript('pre-commit', '.', 'precommit')).toMatchSnapshot()
  })
})
