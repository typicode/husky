import index from './'

index(process.argv)
  .then(status => process.exit(status))
  .catch(err => {
    console.log('Husky > unexpected error', err)
    process.exit(1)
  })
