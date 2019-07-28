import './__env__'
import getScript from '../getScript'

describe('hookScript', (): void => {
  it('should match snapshot', (): void => {
    const script = getScript('.', 'npm')
    expect(script).toMatchSnapshot()
  })
})
