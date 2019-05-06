/* eslint-disable @typescript-eslint/no-var-requires */
const replaceScriptPath = require('./replace-script-path')

// Replace scriptPath with local dev-runner to test locally
replaceScriptPath('scripts/dev-runner.js')
