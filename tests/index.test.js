import { describe, it, expect, beforeEach, vi } from 'vitest';
import { vol, fs as memfs } from 'memfs';
import { join } from 'node:path';

const { state } = vi.hoisted(() => ({
  state: {
    mockPlatform: 'linux',
    mockEnv: {}
  }
}));

vi.mock('node:process', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    get platform() { return state.mockPlatform; },
    get env() { return { ...actual.env, ...state.mockEnv }; },
    cwd: () => (state.mockPlatform === 'win32' ? 'C:\\project' : '/project')
  };
});

vi.mock('node:fs', () => memfs);
vi.mock('node:fs/promises', () => memfs.promises);

const mockSpawnSync = vi.fn();
vi.mock('node:child_process', () => ({
  spawnSync: (cmd, args, opts) => mockSpawnSync(cmd, args, opts),
}));

import install from '../index.js'; 

describe('Husky Install.js Tests', () => {
  const getRoot = () => (state.mockPlatform === 'win32' ? 'C:\\project' : '/project');

  beforeEach(() => {
    vol.reset();
    vi.clearAllMocks();
    state.mockEnv = {};
    state.mockPlatform = 'linux';
    
    mockSpawnSync.mockImplementation((_cmd, args) => {
      if (args && args.includes('rev-parse')) {
        return { status: 0, stdout: getRoot() };
      }
      return { status: 0, stdout: '' };
    });
  });

	describe('Package Manager Configuration', () => {
		it('defaults to npm if no user agent is present', async () => {
			state.mockEnv.npm_config_user_agent = undefined;
			const root = getRoot();
			vol.fromJSON({ [join(root, 'package.json')]: '{}' });

			await install();

			const pkg = JSON.parse(vol.readFileSync(join(root, 'package.json'), 'utf8'));
			expect(pkg.scripts.prepare).toBe('node ./bin.mjs');
	});
  it('creates .npmrc with hoisted linker for pnpm', async () => {
    state.mockEnv.npm_config_user_agent = 'pnpm/8.0.0';
    const root = getRoot();
    vol.fromJSON({ [join(root, 'package.json')]: '{}' });

    await install();

    const npmrc = vol.readFileSync(join(root, '.npmrc'), 'utf8');
    expect(npmrc).toContain('node-linker=hoisted');
  });

  it('creates .yarnrc.yml for yarn with node-modules linker', async () => {
    state.mockEnv.npm_config_user_agent = 'yarn/3.0.0';
    const root = getRoot();
    vol.fromJSON({ [join(root, 'package.json')]: '{}' });

    await install();

    const yarnrc = vol.readFileSync(join(root, '.yarnrc.yml'), 'utf8');
    expect(yarnrc).toContain('nodeLinker: node-modules');
  });
});
  describe('Cross-Platform Logic', () => {
		it('uses shell:true and normalizes paths on Windows', async () => {
			state.mockPlatform = 'win32';
			const root = getRoot();
			vol.fromJSON({ [join(root, 'package.json')]: '{}' });
			await install('.husky\\hooks');

			expect(mockSpawnSync).toHaveBeenCalledWith(
				'git',
				['config', 'core.hooksPath', '.husky/hooks'],
				expect.objectContaining({ shell: true })
			);
  	});
		it('validates hook content and LF line endings and sets 0o755 execution permissions on Unix', async () => {
			state.mockPlatform = 'linux';
			const root = getRoot();
			vol.fromJSON({ [join(root, 'package.json')]: '{}' });

			await install();

			const stats = vol.statSync(join(root, '.husky/pre-commit'));
      expect(stats.mode & 0o777).toBe(0o755);
			const hookContent = vol.readFileSync(join(root, '.husky/pre-commit'), 'utf8');
			expect(hookContent).toContain('#!/usr/bin/env node');
			expect(hookContent).not.toContain('\r\n');
  });

  describe('General Integrity', () => {
    it('updates package.json with the prepare script', async () => {
      const root = getRoot();
      const pkgPath = join(root, 'package.json');
      vol.fromJSON({ [pkgPath]: JSON.stringify({ scripts: {} }) });

      await install();

      const updated = JSON.parse(vol.readFileSync(pkgPath, 'utf8'));
      expect(updated.scripts.prepare).toBe('node ./bin.mjs');
    });

    it('skips installation if HUSKY=0 is set', async () => {
      const root = getRoot();
      state.mockEnv.HUSKY = '0';
      
      const result = await install();
      
      expect(result).toBe('Skipped (HUSKY=0)');
      expect(vol.existsSync(join(root, '.husky'))).toBe(false);
    });
		it('falls back to manual traversal if git command fails', async () => {
			const root = getRoot();
			mockSpawnSync.mockReturnValue({ status: 1, stdout: '' });
			
			vol.fromJSON({
				[join(root, '.git/HEAD')]: 'ref: refs/heads/main',
				[join(root, 'package.json')]: '{}'
			});

			const result = await install();
			expect(result).toContain('Husky Ready');
			expect(vol.existsSync(join(root, '.husky'))).toBe(true);
		});
		it('does not overwrite existing hooks', async () => {
			const root = getRoot();
			const hookPath = join(root, '.husky/pre-commit');
			vol.fromJSON({
				[join(root, 'package.json')]: '{}',
				[hookPath]: 'my custom script'
			});

			await install();

			const content = vol.readFileSync(hookPath, 'utf8');
			expect(content).toBe('my custom script');
		});
  });
	});
});
