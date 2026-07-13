# angular-output-target

Internal workspace-only build helper for the custom Stencil Angular output target.

This package exists so `packages/core/stencil.config.ts` can load the local output target as a Node module during `build:core`.

It is not a publishable product package.

## Usage

-   publish-never workspace package
-   built before `build:core`
-   consumed only inside this monorepo

## Building

Run `pnpm run build:angular-output-target` from the repository root.
