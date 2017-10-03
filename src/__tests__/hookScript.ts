import hookScript from '../install/hookScript'

describe('hookScript', () => {
  it('should match snapshot', () => {
    expect(hookScript).toMatchSnapshot()
  })
})
