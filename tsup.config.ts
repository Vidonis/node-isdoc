import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  treeshake: true,
  clean: true,
  minify: true,
  dts: true,
  outExtension({ format }) {
    return {
        js: format === "cjs" ? ".cjs" : ".mjs"
    }
  },
})
