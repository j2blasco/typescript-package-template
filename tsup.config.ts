import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  sourcemap: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
  target: 'es2020',
});
