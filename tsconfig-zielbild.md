# Zielbild: TypeScript-Config-Struktur (3-Schicht-Modell)

## Ausgangslage

Das TS-Setup ist historisch gewachsen und mischt drei Welten:

- **Web/ESM** (Stencil, Vite): `packages/core`, `packages/react`, `packages/vue` — arbeiten bereits mit `moduleResolution: "bundler"`.
- **Angular**: `packages/angular` — hängt an der gemeinsamen Basis, braucht aber Angular-spezifische Optionen (`strictTemplates`, `partial` compilation, eigenes Path-Mapping).
- **Node/CommonJS**: `libs/angular-output-target` — interne Build-Time-Lib mit `module: "commonjs"`.

Problem: Ein einziges globales `moduleResolution`/`module`/`target`/`paths` in `tsconfig.base.json` passt für keine dieser Welten sauber und wird überall lokal überschrieben. Dazu sind Optionen mehrfach dupliziert (`bundler` in core/react/vue, strict-Flags in angular + angular-output-target).

## Zielbild: drei explizite Schichten

```
tsconfig.base.json          → NUR universelle Typ-Sicherheit (framework-neutral)
  └─ tsconfig.web.json      → ESM/Bundler + Decorators (Stencil, React, Vue)
  └─ (Angular-eigene Basis) → Angular-Defaults + strict templates
  └─ (Node-Lib-eigene)      → CommonJS
```

### Schicht 1 — `tsconfig.base.json` (universell)

Enthält **ausschliesslich** framework-neutrale Typ-Sicherheits-Regeln. Keine Modul-, Resolver-, Target- oder Path-Entscheidungen.

```jsonc
{
    "compilerOptions": {
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "noPropertyAccessFromIndexSignature": true,
        "importHelpers": true,
        "skipLibCheck": true,
    },
    "exclude": ["node_modules", "tmp"],
}
```

**Bewusst entfernt gegenüber heute:**

| Option                                             | Warum raus                                                                                                                                                                                                                                                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `moduleResolution: "node"`                         | Gehört pro Welt entschieden (Web: `bundler`, Node-Lib: `node10`). Global gesetzt zwingt es einen falschen Default auf.                                                                                                                                           |
| `module: "esnext"`                                 | Gekoppelt an `moduleResolution`. Wenn `module` bleibt, aber Resolution entfällt, fällt TS auf `classic` zurück (kaputt). Deshalb ebenfalls raus.                                                                                                                 |
| `target: "es2015"`                                 | Footgun — jedes Paket überschreibt es ohnehin auf es2020/es2022/esnext.                                                                                                                                                                                          |
| `baseUrl` + `paths`                                | Cross-Package-Imports laufen im pnpm-Workspace über `node_modules`-Symlinks (`workspace:*`) auf die **gebauten** Pakete. Die base-`paths` decken die real genutzten Subpath-Imports (`.../components/pd-*.js`) gar nicht ab → reine IDE-Convenience, entfernbar. |
| `emitDecoratorMetadata` / `experimentalDecorators` | Stencil/Angular-spezifisch, nicht universell → wandern in die Web- bzw. Angular-Schicht.                                                                                                                                                                         |
| `skipDefaultLibCheck`                              | Redundant neben `skipLibCheck`.                                                                                                                                                                                                                                  |

> **`strict` wird global.** Vorbedingung: die auto-generierten React/Vue-Wrapper müssen strict-clean bauen (dürfen nicht von Hand gefixt werden). Vor dem Aktivieren einmal `build:react` + `build:vue` gegenprüfen.

### Schicht 2 — `tsconfig.web.json` (ESM/Bundler, extends base)

Gemeinsame Basis für alle Stencil-/Vite-Pakete. Eliminiert die heute dreifach duplizierte `bundler`-Konfiguration.

```jsonc
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "target": "es2022",
        "lib": ["dom", "es2022"],
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "allowSyntheticDefaultImports": true,
    },
}
```

Konsumenten:

- `packages/core/tsconfig.json` → `extends: "../../tsconfig.web.json"`, ergänzt nur noch Stencil-JSX (`jsx: "react"`, `jsxFactory: "h"`, `jsxFragmentFactory: "h.Fragment"`).
- `packages/react/tsconfig.json` / `tsconfig.lib.json` → erben Web-Basis, ergänzen `jsx: "react-jsx"`, Vite-Types.
- `packages/vue/tsconfig.json` / `tsconfig.lib.json` → erben Web-Basis, ergänzen `.vue`-Includes, Vite-Types.

### Schicht 3 — Angular & Node-Lib (eigenständig)

Kein Zwang zur gemeinsamen Web-Basis. Beide extenden nur `tsconfig.base.json` (für die universellen Typ-Regeln) und bringen ihre Welt-spezifischen Optionen selbst mit.

- **Angular** (`packages/angular/tsconfig.json`): `extends: base`, dazu `target: es2022`, `moduleResolution: bundler` **explizit** (nicht mehr vererbt!), `angularCompilerOptions` (`strictTemplates`, …), Decorator-Flags. Das `@parlamentsdienste/pdcomponents-core/components/*`-Path-Mapping bleibt **lokal** in `tsconfig.lib.json`.
- **Node-Lib** (`libs/angular-output-target/tsconfig.json`): `extends: base`, dazu `module: "commonjs"`, `moduleResolution` per Default (`node10`), `types: ["node"]`.

## Migrationsschritte

1. `tsconfig.base.json` auf die 7 universellen Optionen eindampfen (`module`/`target`/`moduleResolution`/`baseUrl`/`paths`/`skipDefaultLibCheck`/Decorator-Flags entfernen).
2. Neue `tsconfig.web.json` anlegen.
3. `packages/core` + `packages/react` + `packages/vue` auf `tsconfig.web.json` umhängen, redundante lokale Overrides entfernen.
4. `packages/angular`: `moduleResolution: bundler` **explizit** setzen (vorher via base vererbt).
5. `libs/angular-output-target`: prüfen, dass ohne base-`moduleResolution` weiterhin `node10` greift (durch `module: commonjs` gegeben).
6. **Validierung**: `pnpm run build:all` + je Paket Typecheck. Besonders auf Angular achten (verlorenes vererbtes `moduleResolution`) und auf generierte React/Vue-Wrapper (neu `strict`).

## Nutzen

- Ein Ort pro Entscheidung statt verstreuter Overrides (kein dreifaches `bundler`, keine doppelten strict-Flags).
- Keine gefährlichen globalen Modul-/Resolver-Defaults mehr.
- Jede der drei Welten bleibt bei ihren nativen Defaults, ohne die Root-Config zu verbiegen.
