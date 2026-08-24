# Stencil Custom Elements Empty-Glob Patch

## Kurzfassung

Nach dem Upgrade von Stencil und den Output Targets erzeugt der Angular-Build eine esbuild-Warnung:

```text
The glob pattern import("./**/*.entry.js*") did not match any files [empty-glob]
```

Die Warnung entsteht nicht in unserem Angular-Code, sondern in der von Stencil generierten Runtime-Datei `packages/core/components/index.js`. Diese Datei enthaelt einen Lazy-Loader-Fallback auf `*.entry.js` Dateien. Im `dist-custom-elements` Output werden diese Entry-Dateien aber nicht als passende Dateien erzeugt. Der Build-Patch `packages/core/scripts/patch-components-index.mjs` entfernt diesen ungenutzten Fallback nach `stencil build`.

## Betroffene Konfiguration

Der Core-Build erzeugt Custom Elements ueber `packages/core/stencil.config.ts`:

```ts
{
    type: 'dist-custom-elements',
    customElementsExportBehavior: 'auto-define-custom-elements',
    externalRuntime: false,
    dir: 'components',
}
```

Die Angular-Proxies importieren die Custom-Element-Dateien aus diesem Output direkt, zum Beispiel:

```ts
import { defineCustomElement as definePdButton } from '@parlamentsdienste/pdcomponents-core/components/pd-button.js';
```

## Symptom

Beim Build der Angular-Test-App erschien vor dem Patch folgende Warnung:

```text
▲ [WARNING] The glob pattern import("./**/*.entry.js*") did not match any files [empty-glob]

    ../../packages/core/components/index.js:146:29:
      146 │ ... : import(`./${i}.entry.js${...}`)
```

Der Build war technisch erfolgreich, aber die Warnung war problematisch, weil sie auf einen nicht vorhandenen dynamischen Import im publizierten Core-Paket hinweist.

## Ursache

Stencil erzeugt im Custom-Elements-Runtime-Code einen Fallback fuer Lazy Component Loading. Dieser Fallback sieht sinngemaess so aus:

```js
import(`./${bundleId}.entry.js${hmrQuery}`);
```

Angular verwendet esbuild. esbuild analysiert solche dynamischen Imports statisch und interpretiert sie als Glob-Muster:

```text
import("./**/*.entry.js*")
```

Im `packages/core/components/` Output existieren fuer den Custom-Elements-Build aber keine passenden `*.entry.js` Dateien. Die direkt verwendeten Custom Elements und Chunks liegen dort als direkte Module wie `pd-button.js` und `p-*.js` Dateien. Deshalb meldet esbuild `empty-glob`.

React- und Vue-Builds melden diese Warnung nicht, weil ihre Vite/Rollup-Build-Pfade diese dynamische Importstelle anders behandeln. Die Importstelle selbst stammt trotzdem aus dem Stencil-Core-Output und nicht aus unserem Angular-Wrapper-Code.

## Patch-Datei

Der Patch liegt in:

```text
packages/core/scripts/patch-components-index.mjs
```

Das Script wird im normalen Core-Build direkt nach Stencil ausgefuehrt:

```json
"build": "stencil build && node ./scripts/patch-components-index.mjs"
```

## Patch-Verhalten

Das Script liest die generierte Datei:

```text
packages/core/components/index.js
```

Dann sucht es die von Stencil erzeugte Lazy-Entry-Importstelle:

```js
const lazyEntryImport = /import\(`\.\/\$\{[^}]+\}\.entry\.js\$\{[^`]*\}`\)/g;
```

Diese Importstelle wird ersetzt durch:

```js
Promise.reject(new Error('Lazy component loading is not available in the custom-elements bundle'));
```

Damit bleibt das Verhalten explizit: Falls dieser Fallback zur Laufzeit wider Erwarten erreicht wird, scheitert er klar und lesbar. Gleichzeitig enthaelt `components/index.js` keinen dynamischen Import auf nicht vorhandene `*.entry.js` Dateien mehr.

Das Script bricht den Build ab, wenn es die erwartete Stencil-Importstelle nicht findet:

```js
if (patched === source) {
    throw new Error('Could not find the Stencil lazy entry import in components/index.js');
}
```

Das ist absichtlich so. Wenn Stencil die generierte Runtime aendert, soll der Patch nicht still wirkungslos bleiben.

## Warum der Patch fachlich vertretbar ist

Der Core-Build verwendet `dist-custom-elements` mit `customElementsExportBehavior: 'auto-define-custom-elements'`. Die Angular-Proxies importieren die Custom Elements direkt ueber Subpath-Imports wie `@parlamentsdienste/pdcomponents-core/components/pd-button.js`.

Der entfernte Lazy-Loader-Fallback gehoert zum generischen Stencil-Runtime-Code, wird in diesem Custom-Elements-Szenario aber nicht fuer die normale Component-Registrierung benoetigt. Der Patch entfernt also nicht den genutzten Component-Code, sondern eine ungenutzte Fallback-Importstelle, die auf Dateien zeigt, die in diesem Output nicht existieren.

## Validierung

Folgende Checks wurden erfolgreich ausgefuehrt:

```sh
npm run build:core
cd apps/angular-test && npm run build
npm run build:angular-output-target
npm run build:core
npm run build:angular
npm run build:all
```

Zusaetzlich wurden `npm pack` und ein externer Consumer getestet:

```sh
npm run pack:core
npm run pack:angular
```

In einem frischen Angular-Projekt wurden die erzeugten `.tgz` Pakete installiert und eine minimale App gebaut, die Komponenten aus `@parlamentsdienste/pdcomponents-angular` importiert. Der Build war erfolgreich.

Im installierten Consumer-Paket wurde verifiziert:

```js
{
  versions: '4.0.2 / 4.0.2',
  corePatchPresent: true,
  coreEntryImportPresent: false
}
```

Das bedeutet:

- der gepackte Core enthaelt den Patch in `components/index.js`
- der problematische `.entry.js` Import ist im gepackten Core nicht mehr vorhanden
- das Angular-Paket importiert weiterhin einzelne Core-Komponenten wie `@parlamentsdienste/pdcomponents-core/components/pd-button.js`

## Bekannte verbleibende Warnungen

Der Patch entfernt nur die `empty-glob`-Warnung. Andere bekannte Warnungen sind davon unabhaengig, insbesondere:

- `direct eval` aus `@lottiefiles/lottie-player` / `pd-animation.js`
- Stencil-Hinweis zur empfohlenen `main` Property in `packages/core/package.json`
- Vite Chunk-Size- oder Font-Asset-Warnungen in Test-Apps oder Storybook

## Wann der Patch entfernt werden kann

Der Patch kann entfernt werden, wenn Stencil den `dist-custom-elements` Output so erzeugt, dass `packages/core/components/index.js` keinen dynamischen Fallback-Import auf nicht vorhandene `*.entry.js` Dateien mehr enthaelt oder Angular/esbuild diese Importstelle nicht mehr als leeres Glob-Muster meldet.

Vor dem Entfernen muss mindestens diese Kette ohne `empty-glob` laufen:

```sh
npm run build:core
cd apps/angular-test && npm run build
npm run pack:core
npm run pack:angular
```
