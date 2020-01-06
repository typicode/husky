import './__env__'
import getScript from '../getScript'

describe('hookScript', (): void => {
  it('should match snapshot', (): void => {
    const script = getScript({ relativeUserPkgDir: '.', pmName: 'npm' })
    expect(script).toMatchSnapshot()
  })
})
