import { readFileSync, writeFileSync } from 'node:fs';

const indexPath = new URL('../components/index.js', import.meta.url);
const source = readFileSync(indexPath, 'utf8');

// Stencil currently emits a lazy-loader fallback in the custom-elements runtime
// that references non-existent *.entry.js files. Angular/esbuild reports this as
// an empty dynamic import glob, although this bundle only uses direct p-*.js
// custom-element modules. Keep the failure explicit if the fallback is reached.
const lazyEntryImport = /import\(`\.\/\$\{[^}]+\}\.entry\.js\$\{[^`]*\}`\)/g;
const replacement =
    'Promise.reject(new Error("Lazy component loading is not available in the custom-elements bundle"))';
const patched = source.replace(lazyEntryImport, replacement);

if (patched === source) {
    throw new Error('Could not find the Stencil lazy entry import in components/index.js');
}

writeFileSync(indexPath, patched);
