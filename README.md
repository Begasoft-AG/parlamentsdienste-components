# Web Components Library der Parlamentsdienste

Web Components Library für Parlamentsdienste Core.

Für den einheitlichen und den modernen Auftritt von Webapplikationen bei den Parlamentsdiensten
wurde die vorliegende Bibliothek mit StencilJS umgesetzt und 2025 mit Wrapper für Angular, React und Vue erweitert.

## Library Dokumentation

Components Docs (Storybook):  
https://parlamentsdienste-components.prod.sw.begasoft.ch

**Links Dokumentation**

- [StencilJS](https://stenciljs.com)
- [Storybook](https://storybook.js.org)
- [Vue.js](https://vuejs.org)
- [React](https://react.dev)
- [Angular](https://angular.io)
- [Technische Projektanalyse](doc/README-tech-project-analysis.md)

## pnpm

Die Bibliothek verwendet pnpm als Paketmanager. Um die Abhängigkeiten zu installieren, führen Sie den folgenden Befehl aus:

```bash
corepack enable
pnpm install
```

Die Root-Konfiguration pinnt pnpm explizit über `packageManager`. Unterstützte Node-Version für Entwicklung und CI ist 24.x.

## Entwicklung und Tests

Der vollständige Build läuft in fester Reihenfolge: lokaler Angular Output Target, Core, Angular-, React- und Vue-Wrapper sowie Storybook.

```bash
pnpm run build:all
```

Die Komponenten- und Wrapper-Tests können getrennt gestartet werden:

```bash
pnpm run test:core
pnpm run test:angular
pnpm run test:react
pnpm run test:vue
```

Unter [tools/compat](tools/compat/README.md) liegen zusätzliche Docker-basierte Kompatibilitätstests. Sie bauen frische Consumer-Projekte mit gepackten Release-Artefakten für Angular 17 bis 22 sowie für React und Vue. Diese Tests werden bewusst manuell ausgeführt und sind nicht Teil der GitHub-Actions-Workflows.

## Release erstellen

Die Pack- und Publish-Skripte führen keinen Build aus. Deshalb muss vor jedem Release immer zuerst `build:all` ausgeführt werden. Nur so entsprechen die erzeugten Pakete dem aktuellen Quellcode.

```bash
pnpm install --frozen-lockfile
pnpm run build:all
pnpm run pack:all
```

`pack:all` erzeugt vier versionsgebundene Release-Artefakte. Vor dem echten Publish sollten genau diese Tarballs mit einem Dry-Run geprüft werden:

```bash
VERSION=$(node -p "require('./package.json').version")
npm publish --dry-run --ignore-scripts "dist/core/parlamentsdienste-pdcomponents-core-${VERSION}.tgz"
npm publish --dry-run --ignore-scripts "dist/angular/parlamentsdienste-pdcomponents-angular-${VERSION}.tgz"
npm publish --dry-run --ignore-scripts "dist/react/parlamentsdienste-pdcomponents-react-${VERSION}.tgz"
npm publish --dry-run --ignore-scripts "dist/vue/parlamentsdienste-pdcomponents-vue-${VERSION}.tgz"
```

Erst danach dürfen die bereits geprüften Tarballs veröffentlicht werden:

```bash
pnpm run publish:all
```

Nach Änderungen am Quellcode, an Versionen oder Paketmetadaten muss der Ablauf wieder bei `build:all` begonnen werden. `publish:all` darf nie mit Artefakten aus einem früheren Build ausgeführt werden.

## Lizenz

Diese Bibliothek ist unter der GNU Affero General Public License,
Version 3 (`AGPL-3.0-only`), verfügbar.

Für Nutzungen, bei denen die Bedingungen der AGPL nicht eingehalten
werden können oder sollen, kann eine separate proprietäre Lizenz
vereinbart werden.

Kontakt: https://www.parlament.ch, web@parl.admin.ch
