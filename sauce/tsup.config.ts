// import { defineConfig } from 'tsup';

// export default defineConfig({
//   entry: ['src/index.ts'],
//   format: ['esm'],
//   dts: true,
//   clean: true,
//   sourcemap: true,
//   minify: false,
// });
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2022',
  dts: true,
  clean: true,
  define: {
    __VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
