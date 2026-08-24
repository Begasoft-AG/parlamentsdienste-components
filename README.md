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

Die vorliegende Bibliothek unterliegt der GNU AGPL 3 Lizenz.

Bei Verwendungen gilt zusätzlich:

> Für die Verwendung der Software für proprietäre oder für andere Verwendungen
> wird eine schriftliche Zustimmung der Parlamentsdienste benötigt.

Kontakt: https://www.parlament.ch, web@parl.admin.ch
