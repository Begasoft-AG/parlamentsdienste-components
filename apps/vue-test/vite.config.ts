import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/vue-test',
    server: {
        port: 4200,
        host: 'localhost',
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/@parlamentsdienste/pdcomponents-core/dist/parlamentsdienstecore/assets',
                    dest: '.',
                },
            ],
        }),
    ],
    build: {
        outDir: '../../dist/apps/vue-test',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
}));
