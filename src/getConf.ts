import { cosmiconfigSync } from 'cosmiconfig'

interface Conf {
  skipCI: boolean
  hooks?: { [key: string]: string }
}

export function getConf(dir: string): Conf {
  const explorer = cosmiconfigSync('husky')
  const { config = {} } = explorer.search(dir) || {}

  const defaults: Conf = {
    skipCI: true
  }

  return { ...defaults, ...config }
}
