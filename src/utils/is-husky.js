'use strict'

const fs = require('fs')

module.exports = function isHusky(filename) {
  const data = fs.readFileSync(filename, 'utf-8')
  return data.indexOf('#husky') !== -1
}
