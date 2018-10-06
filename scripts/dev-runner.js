const path = require('path')

// Fake script path
process.argv[1] = path.join(__dirname, '../node_modules/husky/run/bin')
require('../lib/runner/bin')
