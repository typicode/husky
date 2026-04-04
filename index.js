import { spawnSync } from 'node:child_process';
import { mkdir, writeFile, chmod, readFile } from 'node:fs/promises';
import { join, resolve, normalize, relative } from 'node:path';
import { env, platform, cwd } from 'node:process';
import { existsSync } from 'node:fs';

function git(args, options = {}) {
  const { status, stdout } = spawnSync('git', args, {
    ...options,
    encoding: 'utf8',
    shell: platform === 'win32' 
  });
  return { status, out: (stdout || '').trim() };
}

function getGitRoot() {
  const { status, out } = git(['rev-parse', '--show-toplevel']);
  if (status === 0) return resolve(out);

  let current = resolve(cwd());
	while (true) {
    if (existsSync(join(current, '.git'))) return current;
    const parent = resolve(current, '..');
    if (parent === current) break;
    current = parent;
  }
  return null;
}

async function updatePackageJson(gitRoot) {
  const pkgPath = join(gitRoot, 'package.json');
  try {
    const raw = await readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);
    
    pkg.scripts ??= {};
    pkg.scripts.prepare = 'node ./bin.mjs';
    
    const indent = raw.includes('\t') ? '\t' : 2;
    await writeFile(pkgPath, JSON.stringify(pkg, null, indent) + '\n');
  } catch {
		//skip
  }
}

async function configurePackageManager(gitRoot, pm, userAgent) {
  if (pm === 'yarn' && userAgent.includes('yarn/')) {
    const yarnrc = join(gitRoot, '.yarnrc.yml');
    if (!existsSync(yarnrc)) {
      await writeFile(yarnrc, 'nodeLinker: node-modules\n');
    }
  } 
  else if (pm === 'pnpm') {
    const npmrc = join(gitRoot, '.npmrc');
    if (!existsSync(npmrc)) {
      await writeFile(npmrc, 'node-linker=hoisted\n');
    }
  }
}

export default async function install(dir = '.husky') {
  if (env.HUSKY === '0') return 'Skipped (HUSKY=0)';

  const gitRoot = getGitRoot();
  if (!gitRoot) return "Error: Not a git repository";

  const hooksPath = dir.split(/[\\/]/).join('/');

  try {
    git(['config', 'core.hooksPath', hooksPath], { cwd: gitRoot });

    const absoluteHooksDir = resolve(gitRoot, dir);
    await mkdir(absoluteHooksDir, { recursive: true });

    const userAgent = env.npm_config_user_agent || '';
    const pm = userAgent.split('/')[0] || 'npm';

    await configurePackageManager(gitRoot, pm, userAgent);
    await updatePackageJson(gitRoot);

    const hookTemplate = `#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { env, exit, argv, platform } from 'node:process';

if (env.HUSKY === '0' || env.CI === 'true') exit(0);

const cmd = platform === 'win32' ? '${pm}.cmd' : '${pm}';

const { status } = spawnSync(cmd, ['run', ...argv.slice(2)], { 
  stdio: 'inherit',
  shell: platform === 'win32' 
});

exit(status ?? 0);
`.replace(/\r\n/g, '\n');

    const hooks = ['pre-commit', 'prepare-commit-msg', 'commit-msg', 'pre-push'];

    await Promise.all(hooks.map(async (hook) => {
      const path = join(absoluteHooksDir, hook);
      if (existsSync(path)) return;
      
      await writeFile(path, hookTemplate);
      if (platform !== 'win32') await chmod(path, 0o755);
    }));

    return `Husky Ready: Hooks mapped to ${hooksPath}`;
  } catch (err) {
    return `Install failed: ${err.message}`;
  }
}
