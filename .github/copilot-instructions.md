# Copilot Instructions – parlamentsdienste-components

## Response Style

-   Be extremely concise; use clear, descriptive language; avoid jargon
-   Focus on key points; maintain logical flow
-   End every response with questions to clarify ambiguities or gather more information

## Architecture Overview

Nx monorepo (pnpm) with four publishable packages and a Storybook docs app.

```
packages/core/          # StencilJS web components — source of truth
packages/angular/       # Angular wrapper (partially auto-generated)
packages/react/         # React wrapper (fully auto-generated)
packages/vue/           # Vue wrapper (fully auto-generated)
libs/angular-output-target/  # Custom fork of @stencil/angular-output-target (see below)
apps/{angular,react,vue}-test/  # Integration test/demo apps (Playwright e2e)
docs/stories/           # Storybook stories, one folder per component
```

**Critical rule**: all component logic lives in `packages/core/src/components/`. The React and Vue wrappers (`packages/react/src/generated/`, `packages/vue/src/generated/`) and the Angular proxy files (`packages/angular/src/lib/angular/components.ts`, `index.ts`) are **auto-generated** by `pnpm run build:core` — never edit them by hand.

## Form Control Integration (Angular ngModel / React controlled / Vue v-model)

Value accessor mappings are defined in **two places** — keep them in sync:

1. `packages/core/stencil.config.ts` → `angularValueAccessorConfigs[]` and `vueComponentModels[]`
2. `packages/angular/src/lib/angular/value-accessor.ts` → `INPUTMAP`

When adding a new form control component, update both files.

## Custom Angular Output Target (`libs/angular-output-target/`)

This is a **local fork** of the upstream [`@stencil/angular-output-target`](https://github.com/stenciljs/output-targets/tree/main/packages/angular-output-target), not the npm package. It is published as `@parlamentsdienste/angular-output-target` and imported in `stencil.config.ts`.

Key customisations over upstream:

-   **`inlineProperties` option** ([`generate-angular-component.ts`](libs/angular-output-target/src/lib/generate-angular-component.ts)): when enabled, renders each Stencil `@Prop` as an empty Angular setter stub. This allows Angular Language Service to type-check and show JSDoc in HTML templates — the upstream version does not support this.
-   **Custom value-accessor generation**: templates in `resources/control-value-accessors/` are copied verbatim then patched with selectors/events from `angularValueAccessorConfigs` at build time. The resulting files land in `packages/angular/src/lib/angular/`.

**Reference implementation**: this project follows the architecture of the [Baloise Design System](https://github.com/baloise/design-system) — look there for patterns on multi-framework Stencil monorepos, wrapper generation, and Storybook integration.
