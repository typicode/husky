import cosmiconfig from 'cosmiconfig'

interface Conf {
  skipCI: boolean
  hooks?: { [key: string]: string }
}

export default function getConf(dir: string): Conf {
  const explorer = cosmiconfig('husky')
  const { config = {} } = explorer.searchSync(dir) || {}

  const defaults: Conf = {
    skipCI: true
  }

  return { ...defaults, ...config }
}
