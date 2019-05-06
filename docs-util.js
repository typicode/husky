/* eslint-disable @typescript-eslint/no-var-requires */
// Used to generate trees for docs.md
const formatree = require('formatree')

console.log(
  formatree({
    root: {
      '.git': 0,
      'package.json 🐶 # add husky here': 0,
      packages: {
        A: { 'package.json': 0 },
        B: { 'package.json': 0 },
        C: { 'package.json': 0 }
      }
    }
  })
)

console.log(
  formatree({
    root: {
      '.git': 0,
      'package.json 🐶 # add husky here': 0,
      'sub-directory': {
        'package.json': 0
      }
    }
  })
)
