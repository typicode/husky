import append from './append'

const [, , hookFilename, ...argv] = process.argv
append([hookFilename, ...argv])
  .then(status => process.exit(status))
  .catch(err => {
    console.log('Husky > unexpected error', err)
    process.exit(1)
  })
