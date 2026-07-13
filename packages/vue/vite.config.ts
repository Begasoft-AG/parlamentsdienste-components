/// <reference types='vitest' />
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/vue',
    plugins: [
        vue(),
        tsconfigPaths(),
        dts({ entryRoot: 'src', tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'), pathsToAliases: false }),
    ],
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        outDir: './dist',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            // Could also be a dictionary or array of multiple entry points.
            entry: 'src/index.ts',
            name: 'vue',
            fileName: 'index',
            // Change this to the formats you want to support.
            // Don't forget to update your package.json as well.
            formats: ['es' as const],
        },
        rollupOptions: {
            external: id => {
                return ['@parlamentsdienste/pdcomponents-core', '@stencil/vue-output-target/runtime'].some(
                    pkg => id === pkg || id.startsWith(`${pkg}/`),
                );
            },
        },
    },
}));
