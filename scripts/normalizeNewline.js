const fs = require('fs')
const path = require('path')
const normalizeNewline = require('normalize-newline')

// When running npm publish on Windows, template/hook.sh must use LF ending
const filename = path.join(__dirname, '../template/hook.sh')
console.log(`Converting ${filename} line ending to LF`)
const buffer = fs.readFileSync(filename)
fs.writeFileSync(filename, normalizeNewline(buffer))