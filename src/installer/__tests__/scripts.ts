import './__env__'
import { getHookScript } from '../hooks'
import { getLocalScript } from '../localScript'
import { getMainScript } from '../mainScript'

describe('hookScript', (): void => {
  it('should match snapshot', (): void => {
    const script = getHookScript()
    expect(script).toMatchSnapshot()
  })
})

describe('localScript', (): void => {
  it('should match snapshot', (): void => {
    const script = getLocalScript('npm', '.')
    expect(script).toMatchSnapshot()
  })
})

describe('mainScript', (): void => {
  it('should match snapshot', (): void => {
    const script = getMainScript()
    expect(script).toMatchSnapshot()
  })
})
