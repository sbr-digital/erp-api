import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      include: ['src'],
      exclude: [
        'src/infra/database/prisma/index.ts',
        'src/interfaces/index.ts',
        'src/@types/**',
      ],
    },
    globals: true,
    environmentMatchGlobs: [['e2e/**', 'prisma']],
    setupFiles: ['./setupTests.ts'],
  },
})
