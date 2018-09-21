const path = require('path')

// Fake script path
process.argv[1] = path.join(__dirname, '../node_modules/husky/lib/runner/bin')
require('../lib/runner/bin')
