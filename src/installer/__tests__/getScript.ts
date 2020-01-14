import './__env__'
import getScript from '../getScript'

describe('hookScript', (): void => {
  it('should match snapshot', (): void => {
    const script = getScript({
      relativeUserPkgDir: '.',
      pmName: 'npm',
      pmVersion: '6.9.0'
    })
    expect(script).toMatchSnapshot()
  })
})
