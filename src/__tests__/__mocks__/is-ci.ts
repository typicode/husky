const isCI: any = jest.genMockFromModule('is-ci')

export function __set(bool: boolean) {
  module.exports = bool
}

export default isCI
