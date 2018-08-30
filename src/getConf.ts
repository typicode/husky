import * as cosmiconfig from 'cosmiconfig'

export type IConfInstallType = 'overwrite' | 'append' | 'skip'
interface IConf {
  installType: IConfInstallType
  skipCI: boolean
  hooks?: any
}

export default function getConf(dir: string): IConf {
  const explorer = cosmiconfig('husky')
  const { config = {} } = explorer.searchSync(dir) || {}

  const defaults: IConf = {
    installType: 'skip',
    skipCI: true
  }

  return { ...defaults, ...config }
}
