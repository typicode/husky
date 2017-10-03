// Used for local testing ONLY
const fs = require('fs')
const path = require('path')

if (fs.existsSync('./lib/install/index.js')) {
  // Can be "install" or "uninstall"
  const action = process.argv[2]

  // Run installer
  require('./lib/install')[action]('node_modules/husky')

  // Replace ./node_modules/husky/run with ./lib/run
  const gitHooksDir = '.git/hooks'
  fs.readdirSync(gitHooksDir)
    .map(filename => path.join(gitHooksDir, filename))
    .forEach(hook => {
      const data = fs.readFileSync(hook, 'utf-8')
      const updated = data.replace('./node_modules/husky/lib/run', './lib/run')
      fs.writeFileSync(hook, updated)
    })
} else {
  console.error("Error can't find lib directory, run `npm run build`")
}
