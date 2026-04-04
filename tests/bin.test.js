import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import path, { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { run } from '../bin.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const binFile = resolve(__dirname, '../bin.mjs');

const { shared } = vi.hoisted(() => ({
  shared: { install: vi.fn() }
}));

vi.mock('../index.js', () => ({
  default: (...args) => shared.install(...args)
}));

const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined);
const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
const mockError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('Husky bin.mjs Tests', () => {
  const originalArgv = [...process.argv];

  beforeEach(() => {
    vi.clearAllMocks();
    shared.install.mockReset();
    shared.install.mockResolvedValue('Success');
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  const loadBin = async (argv) => {
    process.argv = argv;
    await run(argv);
  };

  it('triggers install on "init" command', async () => {
    shared.install.mockResolvedValue('Mocked Success');
    await loadBin(['node', binFile, 'init']);
    expect(shared.install).toHaveBeenCalled();
    expect(mockLog).toHaveBeenCalledWith('Mocked Success');
  });

  it('should run install when called from node_modules path', async () => {
    const fakePath = path.join('project', 'node_modules', 'husky', 'bin.mjs');
    await loadBin(['node', fakePath, 'init']);
    expect(shared.install).toHaveBeenCalled();
  });

  it('should NOT run install if the script path is not a husky file', async () => {
    const otherPath = path.resolve('other', 'random.js'); 
    await loadBin(['node', otherPath, 'init']);
    expect(shared.install).not.toHaveBeenCalled();
  });

  it('should exit with 1 if installation fails', async () => {
    const error = new Error('Disk full');
    shared.install.mockRejectedValue(error);
    await loadBin(['node', binFile, 'init']);
    expect(mockError).toHaveBeenCalledWith(error);
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
