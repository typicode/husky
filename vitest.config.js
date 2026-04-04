import { defineConfig } from 'vitest/config';

export default defineConfig({
  ssr: {
    noExternal: true,
  },
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['index.js', 'bin.js'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      }
    },
    globals: true,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    projects: [
      {
        name: 'core',
        environment: 'node',
        include: ['**/test/index.test.js'],
      },
      {
        name: 'cli',
        environment: 'node',
        include: ['**/test/bin.test.js'],
        isolate: true,
        testTimeout: 10000,
      },
    ],
  },
});
