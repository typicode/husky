import { checkGitDirEnv } from '../checkGitDirEnv'
import index from './'

async function run(): Promise<void> {
  checkGitDirEnv()

  try {
    const status = await index(process.argv)
    process.exit(status)
  } catch (err) {
    console.log('Husky > unexpected error', err)
    process.exit(1)
  }
}

run()
