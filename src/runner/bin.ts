import index from './'

// Run hook
index(process.argv)
  .then((status: number): void => process.exit(status))
  .catch((err: Error): void => {
    console.log('Husky > unexpected error', err)
    process.exit(1)
  })
