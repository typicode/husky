const fs = require('fs')
const path = require('path')
const execa = require('execa')

// Prevent error when cloning husky project
if (fs.existsSync('./lib/install/index.js')) {
  // Can be "install" or "uninstall"
  const action = process.argv[2]

  // Find Git dir
  const { status, stdout, stderr } = execa.sync('git', ['rev-parse', '--absolute-git-dir'])
  const gitDir = path.resolve(stdout) // Needed to convert \ to / on Windows

  // Get Husky dir
  const huskyDir = process.env.NODE_ENV === 'dev'
    ? 'node_modules/husky' // Faking Husky location
    : __dirname
  
  if (status !== 0) {
    console.log(stderr)
    process.exit(1)
  }

  // Run installer
  require('./lib/install')[action](gitDir, huskyDir)

  if (process.env.NODE_ENV=== 'dev') {
    // Replace ./node_modules/husky/run with ./lib/run
    const gitHooksDir = '.git/hooks'
    fs.readdirSync(gitHooksDir)
      .map(filename => path.join(gitHooksDir, filename))
      .forEach(hook => {
        const data = fs.readFileSync(hook, 'utf-8')
        const updated = data.replace('./node_modules/husky/', './')
        fs.writeFileSync(hook, updated)
      })
  }
} else {
  console.error("Error can't find lib directory, run `npm run build`")  
}