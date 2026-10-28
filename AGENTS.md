# Project orientation

pnpm workspace for a Stencil web component library.

- [packages/core/src/components/](packages/core/src/components/): component source of truth; implement component logic here.
- [packages/angular/](packages/angular/), [packages/react/](packages/react/), [packages/vue/](packages/vue/): framework wrappers.
- [libs/angular-output-target/](libs/angular-output-target/): custom Angular wrapper generator.
- [docs/stories/](docs/stories/): Storybook documentation and component examples.
- [apps/angular-test/](apps/angular-test/), [apps/react-test/](apps/react-test/), [apps/vue-test/](apps/vue-test/): integration apps and Playwright tests.

Do not edit generated wrapper files by hand. Regenerate them with `pnpm run build:core`.

Do not create or modify tests unless explicitly requested by the user. Running existing tests is allowed.

Before making changes, always look for existing patterns, templates, naming conventions, and reusable implementations in the codebase. Follow and reuse them whenever possible instead of introducing new conventions or duplicating logic.
