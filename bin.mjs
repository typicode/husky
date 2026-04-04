import process from 'node:process';
import path from 'node:path';
import install from './index.js';

export async function run(args = process.argv) {
  const scriptPath = path.normalize(args[1] || '');
  const cmd = args[2];

  const isHuskyFile = scriptPath.endsWith('husky') || scriptPath.endsWith('bin.mjs');
  const isInsideNodeModules = scriptPath.includes('node_modules');
  const isHusky = isHuskyFile || (isInsideNodeModules && isHuskyFile);

  if (isHusky) {
    if (cmd === 'init' || args.length === 2) {
      try {
        const msg = await install();
        if (msg) console.log(msg);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    }
  }
}
