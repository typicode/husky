// Mock Date to have deterministic test
Date.now = jest.fn((): number => 1482363367071)

// Faking env variable
process.env = {
  ...process.env,
  PWD: '/home/typicode/projects/foo-package',
  // eslint-disable-next-line @typescript-eslint/camelcase
  npm_config_user_agent: 'npm/6.9.0 node/v12.4.0 linux x64',
  // eslint-disable-next-line @typescript-eslint/camelcase
  npm_package_homepage: 'https://github.com/foo/foo-package',
  // eslint-disable-next-line @typescript-eslint/camelcase
  npm_package_name: 'foo-package'
}

// Mock Date.toLocaleString
global.Date = class extends Date {
  public toLocaleString(): string {
    return '<locale date string>'
  }
} as DateConstructor
