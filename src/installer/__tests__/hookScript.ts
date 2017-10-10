import hookScript from '../hookScript'

describe('hookScript', () => {
  it('should match snapshot', () => {
    expect(hookScript).toMatchSnapshot()
  })
})
