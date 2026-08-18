import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.test.ts'],
    // If you want to exclude tests inside node_modules or build
    exclude: ['node_modules/**', '.next/**'],
  },
});