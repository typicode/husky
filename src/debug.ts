export function debug(...args: string[]): void {
  if (['1', 'true'].includes(process.env.HUSKY_DEBUG || '')) {
    console.log('husky:debug', ...args)
  }
}
