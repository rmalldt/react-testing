import { defineConfig } from 'vitest/config';

// This function return a configuration object
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts', // run before each test
  },
});
