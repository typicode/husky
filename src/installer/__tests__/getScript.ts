import * as path from 'path'
import getScript from '../getScript'

describe('hookScript', () => {
  it('should match snapshot', () => {
    const userDir = path.join(__dirname, '../../..')

    // On OS X/Linux runNodePath gets resolved to the following value
    // In order to make the test deterministic on AppVeyor, the value is hardcoded
    const runNodePath = 'node_modules/run-node/run-node'

    expect(getScript(userDir, runNodePath)).toMatchSnapshot()
  })
})
