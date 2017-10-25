import * as path from 'path'
import getScript from '../getScript'

describe('hookScript', () => {
  it('should match snapshot', () => {
    const userDir = path.join(__dirname, '../../..')
    expect(getScript(userDir)).toMatchSnapshot()
  })
})
