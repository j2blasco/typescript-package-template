import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
  bundle: true,
  treeshake: true,
  external: [],
});
