import * as execa from 'execa'
import * as fs from 'fs'
import * as path from 'path'
import { getUserStagedFilename, writeHook } from '../installer'
import { remove } from '../installer/getAppendScript'

/**
 * @param argv - process.argv
 */
export default async function run([hookFilename, ...args]: string[]): Promise<
  number
> {
  const cwd = process.cwd()
  const hookName = path.basename(hookFilename)
  const userHookFilename = getUserStagedFilename(hookFilename)
  if (!fs.existsSync(userHookFilename)) {
    console.log(`husky > ${hookName} user's hook is not found`)

    // Remove `append` string wrapper
    if (fs.existsSync(hookFilename)) {
      const script = fs.readFileSync(hookFilename).toString()
      const removedScript = remove(script)
      if (removedScript !== script) {
        writeHook(hookFilename, removedScript)
      }
    }

    return 0
  }

  try {
    const rlt = execa.sync(userHookFilename, args, { cwd, stdio: 'inherit' })
    return rlt.code
  } catch (err) {

    console.log(`husky > run ${hookName} user's hook failed ${err.message}`)
    return err.code
  }
}
