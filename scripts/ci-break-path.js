/* eslint-disable @typescript-eslint/no-var-requires */
const replaceScriptPath = require('./replace-script-path')

// Replace scriptPath with missing script, which is the same as node_modules/husky being deleted
replaceScriptPath('missing/script.js')
