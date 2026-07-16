import { StorybookConfig } from '@storybook/html-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    features: {
        menuOnboardingChecklist: false,
        sidebarOnboardingChecklist: false,
    },
    /**
     * Vite-Alias für Utils-Imports vom Core-Package.
     *
     * Problem: Im Dev-Setup ist @parlamentsdienste/pdcomponents-core nur ein Symlink
     * auf packages/core (Quellcode ohne dist/). Das package.json-Export zeigt auf
     * dist/collection/utils/index.js, was im Dev noch nicht existiert.
     *
     * Lösung: Alias leitet @parlamentsdienste/pdcomponents-core/utils direkt zur
     * TypeScript-Quelle (packages/core/src/utils/index.ts) um.
     */
    viteFinal: async config => {
        return mergeConfig(config, {
            resolve: {
                alias: {
                    '@parlamentsdienste/pdcomponents-core/utils': path.resolve(
                        storybookDir,
                        '../../packages/core/src/utils/index.ts',
                    ),
                },
            },
        });
    },
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs'],
    framework: {
        name: '@storybook/html-vite',
        options: {},
    },
    staticDirs: [
        {
            from: '../node_modules/@parlamentsdienste/pdcomponents-core/dist/parlamentsdienstecore/assets',
            to: '/assets',
        },
        {
            from: '../node_modules/@parlamentsdienste/pdcomponents-core/dist/parlamentsdienstecore',
            to: '/assets',
        },
    ],
};
export default config;
