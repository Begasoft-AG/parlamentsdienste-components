import angular from 'angular-eslint';
import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    ...angular.configs.tsRecommended,
    ...angular.configs.templateRecommended,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'lib', style: 'camelCase' }],
            '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'lib', style: 'kebab-case' }],
        },
    },
    {
        files: ['**/*.html'],
        rules: {},
    },
];
