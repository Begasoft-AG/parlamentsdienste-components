# Dependency Upgrade Plan

## Zielbild

Dieses Upgrade-Programm verfolgt einen bewussten Major-Update-Pfad mit mehreren kleinen PRs und einem gemeinsamen Major-Release am Ende.

Festgelegte Leitplanken:

- Angular 22 ist das Ziel.
- Mehrere fokussierte PRs statt eines Sammel-PRs.
- Ein gemeinsamer Major-Release erst nach Abschluss aller Wellen.
- Keine dauerhaften Peer-Dependency-Workarounds.
- Jede Welle hat eine harte Definition of Done.
- Jede Welle bleibt fachlich fokussiert, darf aber kleine notwendige Folgeänderungen im direkten Abhängigkeitsradius enthalten.

## Aktueller Umsetzungsstand

- Welle 1: abgeschlossen
- Welle 2: abgeschlossen
- Welle 3: in Arbeit
- Wellen 4 - 6: ausstehend

Die paketlokale Dependency-Ownership wird ab Welle 3 schrittweise umgesetzt. Die bereits abgeschlossenen Wellen 1 und 2 werden dafür nicht nachträglich geöffnet. Verbleibende Ownership-Lücken aus deren Scope werden in der jeweils nächsten fachlich passenden Welle geschlossen.

## Technisches Zielbild

Der technische Zielzustand nach Abschluss aller Wellen ist:

- Node: 22 und 24 als vorgesehene Arbeits- und CI-Versionen
- pnpm: eindeutig über Root-`packageManager` gepinnt und lokal/CI konsistent
- Angular: 22 als Primärziel
- React: 19 auf aktuellem Stable-Patch-Level
- Vue: 3 auf aktuellem Stable-Patch-Level
- Browser-Support: unverändert, solange keine fachliche Anforderung etwas anderes verlangt

## Zielbild für Dependency-Ownership

Der Root orchestriert den Workspace, ist aber keine implizite Dependency-Quelle für einzelne Pakete oder Apps.

Verbindliche Regel:

> Das Workspace-Paket, das ein Paket importiert oder dessen Binary in einem Script aufruft, deklariert es selbst.

Daraus folgt:

- Veröffentlichte Libraries führen Consumer-Verträge als `peerDependencies`, notwendige Laufzeitpakete als `dependencies` und ihre konkrete Build-/Toolchain als `devDependencies`.
- Test-Apps deklarieren Framework, Builder, Dev-Server, TypeScript-/Vite-Plug-ins und E2E-Werkzeuge selbst. Sie sollen echte Consumer abbilden und nicht zufällig über Root-Hoisting funktionieren.
- Interne Build-Libraries wie `libs/angular-output-target/` deklarieren ihre Compiler und direkt verwendeten Werkzeuge selbst.
- Der Root behält nur repo-weite Werkzeuge, die von Root-Konfigurationen oder Root-Kommandos direkt verwendet werden, sowie die Orchestrierungsskripte.
- Ein Root-Script wie `pnpm --filter <paket> run build` begründet keine Root-Dependency auf die Toolchain des Zielpakets.
- Gemeinsam verwendete interne Build-, Tooling- und Framework-Versionen werden über pnpm-Catalogs zentral abgestimmt. Die Dependency-Deklaration und damit die Ownership bleibt trotzdem paketlokal.
- Dependencies werden erst aus dem Root entfernt, nachdem alle direkten Nutzer sie lokal deklariert haben und die betroffenen Installations- und Buildpfade erfolgreich validiert wurden.

Angestrebte Ownership:

| Bereich                       | Paketlokale Ownership                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `packages/core/`              | Stencil, Output-Targets und Core-Testwerkzeuge                                                                          |
| `packages/angular/`           | `ng-packagr`, Angular Compiler, TypeScript und konkrete Angular-Buildversionen; unterstützte Angular-Verträge als Peers |
| `packages/react/`             | Wrapper-Buildwerkzeuge lokal; React und React DOM als Peers                                                             |
| `packages/vue/`               | Wrapper-Buildwerkzeuge lokal; Vue als Peer                                                                              |
| `apps/*-test/`                | jeweiliges Framework, App-Builder, Dev-Server und Playwright                                                            |
| `libs/angular-output-target/` | TypeScript und weitere direkt verwendete Buildwerkzeuge                                                                 |
| `docs/`                       | Storybook und seine direkt verwendeten Integrationen                                                                    |
| Root                          | Orchestrierung und tatsächlich repo-weite Toolchain                                                                     |

Die Migration erfolgt entlang der fachlichen Wellen: Angular in Welle 3, React/Vite in Welle 4, Vue in Welle 5 und Storybook/Dokumentation in Welle 6. Verbleibende Core-/Output-Target-Lücken aus der abgeschlossenen Welle 2 dürfen in Welle 3 mitgezogen werden, wenn sie für den Angular-Pfad direkt relevant sind; andere Lücken werden spätestens im Abschluss-Review von Welle 6 bereinigt.

## Zielbild für pnpm-Catalogs

`pnpm-workspace.yaml` ist die zentrale Quelle für gemeinsam verwendete interne Dependency-Versionen. Workspace-Pakete referenzieren diese Versionen mit `catalog:` oder einem benannten Catalog wie `catalog:angular22`, statt dieselbe Versionsnummer mehrfach zu pflegen.

Verbindliche Regeln:

- Benannte Catalogs gruppieren fachlich gekoppelte Versionen, mindestens für Angular, React/Vite, Vue und gemeinsame Toolchain-Pakete.
- Der Default-Catalog enthält nur Versionen, die tatsächlich frameworkübergreifend gemeinsam verwendet werden.
- Konkrete Build- und Tooling-Versionen dürfen Catalog-Referenzen verwenden.
- Öffentliche `peerDependencies` bleiben explizit gepflegt und werden nicht aus internen Build-Catalogs abgeleitet.
- Interne Workspace-Abhängigkeiten verwenden weiterhin `workspace:*`; Catalogs ersetzen das Workspace-Protokoll nicht.
- Ein Paket deklariert seine Dependency weiterhin selbst. Catalogs zentralisieren nur die Version, nicht die Ownership.
- Ein Catalog-Eintrag bleibt nur bestehen, wenn er von mindestens einem Workspace-Paket verwendet wird.
- Änderungen an einem Catalog werden mit den davon betroffenen Installations- und Buildpfaden validiert.

Die Einführung erfolgt schrittweise: Angular-Catalog in Welle 3, React-/Vite-Catalogs in Welle 4, Vue-Catalog in Welle 5 sowie gemeinsame Toolchain-, Storybook- und Abschlussbereinigung in Welle 6. Bereits abgeschlossene Stencil-/Output-Target-Versionen aus Welle 2 werden spätestens in Welle 6 katalogisiert, sofern sie von mehreren Workspace-Paketen gemeinsam verwendet werden.

## Release-Strategie

- Umsetzung in mehreren PRs entlang der Upgrade-Wellen
- Kein Zwischenrelease der Bibliothek pro Welle
- Versionserhöhung und Changelog-Eintrag erst am Ende
- Gemeinsamer Release als neuer Major nach erfolgreichem Abschluss aller Wellen

## Allgemeine Regeln pro Welle

Eine Welle gilt nur dann als abgeschlossen, wenn alle folgenden Punkte erfüllt sind:

- `pnpm install` läuft ohne Ausweichmechanismen wie `--legacy-peer-deps`.
- Keine relevanten offenen Peer-Dependency-Konflikte bleiben zurück.
- Der Lockfile ist reproduzierbar und konsistent.
- Alle zur Welle gehörenden Builds laufen erfolgreich.
- Bekannte Warnungen oder Brüche werden nicht stillschweigend in die nächste Welle verschoben.
- Alle im Scope direkt importierten Pakete und aufgerufenen Binaries sind im verantwortlichen Workspace-Paket deklariert.
- Eine Welle entfernt ihre framework-spezifischen Root-Dependencies erst, wenn kein anderer Workspace-Pfad mehr implizit davon abhängt.
- Gemeinsam verwendete Versionen im Scope werden in den fachlich passenden pnpm-Catalog aufgenommen und aus den Paketmanifesten über eine Catalog-Referenz bezogen.

## Build- und Installationsgrundlage

Bestehende harte Prüfpfade im Repo:

- Core/Stencil: `pnpm run build:angular-output-target`, `pnpm run build:core`
- Wrapper: `pnpm run build:angular`, `pnpm run build:react`, `pnpm run build:vue`, `pnpm run build:all`
- Storybook: `pnpm run build:storybook` lokal oder als CI-Check; der bestehende Docker-Publish-Workflow ersetzt diesen Build-Check nicht.

## Welle 1: Infrastruktur und Tooling

### Ziel

Die Laufzeit- und Build-Umgebung fixieren, damit spätere Fehler aus echten Dependency-Änderungen kommen und nicht aus einer driftenden Toolchain.

### Scope

In diese Welle gehören:

- Node- und pnpm-Pinning bereinigen
- Root-`packageManager` setzen
- `.npmrc` und `engines` mit dem Node-/pnpm-Zielbild abgleichen
- CI-Versionen für Node und pnpm explizit konsistent halten
- CI-Checks mindestens für Node 24 ausführen und Node 22 entweder als Matrix oder als dokumentierten Wellen-Check ergänzen
- GitHub Actions aktualisieren, soweit sie die Build-Toolchain betreffen
- Storybook-Build als echten Build-Check absichern, falls er release-blockierend bleiben soll
- Install-Reproduzierbarkeit und Lockfile-Disziplin absichern
- Kleine Tooling-Updates rund um ESLint/Prettier und ähnliche Low-Risk-Basiswerkzeuge

Bewusst nicht in diese Welle:

- TypeScript-Major-Updates
- Vite-Major-Updates
- Vitest-Major-Updates
- Framework-spezifische Builder-Sprünge
- Angular-, React-, Vue- oder Stencil-nahe Paketgruppen

### Erwartete Dateien

- `package.json`
- `.github/workflows/*.yml`
- optional `.npmrc` oder ergänzende Toolchain-Dateien, falls nötig

### Validierung

- `pnpm install --frozen-lockfile`
- `pnpm install`
- bei Änderungen an CI-relevanten Skripten zusätzlich mindestens `pnpm run build:angular-output-target`
- falls Node 22 nicht in CI läuft: mindestens ein dokumentierter Install-/Build-Check mit Node 22

### Definition of Done

- Toolchain ist lokal und in CI eindeutig festgelegt.
- Installation läuft sauber.
- Kein späterer Wellenfehler kann plausibel auf unklare Node-/pnpm-Bedingungen zurückgeführt werden.

## Welle 2: Stencil plus Output-Targets

### Ziel

Core und Generierungsbasis modernisieren, ohne Angular/React/Vue vorschnell mit einem großen Querschnittswechsel zu vermischen.

### Scope

- `@stencil/core`
- `@stencil/react-output-target`
- `@stencil/vue-output-target`
- Stencil-nahe Pakete im Core
- eigener Angular-Output-Target-Fork, soweit für die neue Stencil-Version nötig

### Besondere Risiken

- Der lokale Fork in `libs/angular-output-target/` ist ein aktiver Teil der Generierungskette.
- `build:core` hängt implizit an vorgebauten Workspace-Artefakten.
- Generierte Wrapper-Dateien dürfen nicht manuell editiert werden.

### Validierung

- `pnpm run build:angular-output-target`
- `pnpm run build:core`

### Definition of Done

- Core baut sauber.
- Output-Targets erzeugen die erwarteten Wrapper-Artefakte.
- Keine regressiven Build- oder Generierungsfehler im Wrapper-Pfad.

## Welle 3: Angular-Stack

### Ziel

Angular im gesamten Repo auf 22 anheben.

### Scope

- Angular-Dependencies aus dem Root in die direkt verantwortlichen Pakete verschieben und anschließend nicht mehr benötigte Root-Einträge entfernen
- Angular CLI, Devkit, Builder, Compiler, Forms, Router, Language Service
- TypeScript, soweit Angular 22 eine andere TypeScript-Range verlangt
- `@analogjs/vite-plugin-angular`
- `@analogjs/vitest-angular`
- `packages/angular/`
- `apps/angular-test/`
- `libs/angular-output-target/`
- direkt Angular-relevante Ownership-Lücken aus `packages/core/`, insbesondere dort importierte Angular-Output-Target-Pakete
- Angular-22-Build- und Tooling-Versionen in einem benannten pnpm-Catalog zentralisieren

### Besondere Risiken

- Angular 22 ist ein bewusstes Ziel und kein optionales Stretch-Target.
- Der lokale Fork darf aktiv angepasst werden, wenn Angular 22 dort Brüche erzeugt.
- Peer-Dependency-Konflikte dürfen nicht mit dauerhaften Workarounds zugedeckt werden.
- Öffentliche Angular-`peerDependencies` sind von den konkreten Angular-22-Buildversionen getrennt; letztere gehören in die jeweiligen `devDependencies`.
- `packages/angular/` und `apps/angular-test/` dürfen nach Abschluss der Welle nicht von Angular-Binaries oder Angular-Paketen aus dem Root abhängen.

### Validierung

- `pnpm run build:angular-output-target`
- `pnpm run build:core`
- `pnpm run build:angular`
- `pnpm run build:all`

### Definition of Done

- Angular 22 läuft im Monorepo sauber.
- Angular-Wrapper baut und funktioniert.
- Keine offenen Peer-Konflikte in Angular-relevanten Paketen.
- `packages/angular/` deklariert `ng-packagr`, Angular Compiler, TypeScript und seine konkrete Angular-Buildversion selbst.
- `apps/angular-test/` deklariert Angular CLI, Builder, Framework-Laufzeit und Playwright selbst.
- `libs/angular-output-target/` deklariert TypeScript und weitere direkt verwendete Buildwerkzeuge selbst.
- Nicht mehr benötigte Angular-Pakete sind aus den Root-Dependencies entfernt.
- Ein frischer pnpm-Install sowie Angular-Build funktionieren ohne implizite Root-Dependencies.
- Gemeinsam verwendete Angular-22-Build- und Tooling-Versionen liegen im Angular-Catalog; die Paketmanifeste referenzieren ihn.

## Welle 4: React und Vite

### Ziel

React- und Vite-bezogene Pakete auf eine aktuelle stabile Linie bringen, nachdem Core und Angular bereits stabilisiert sind.

### Scope

- `react`, `react-dom`, `@types/react`, `@types/react-dom`
- `vite`
- `@vitejs/plugin-react`
- React-Test-App
- React-Wrapper
- nur die dafür nötigen Nebentools
- React- und Vite-Dependencies aus dem Root in die direkt verantwortlichen Pakete verschieben
- gemeinsame React- und Vite-Versionen in fachlich passenden pnpm-Catalogs zentralisieren

### Besondere Risiken

- Vite ist kein reines React-Detail; Änderungen können Vue- und Storybook-Buildpfade beeinflussen.

### Validierung

- `pnpm run build:react`
- bei Vite-Major-Update zusätzlich mindestens ein Vue- oder Storybook-Smoke-Build, um Quereffekte sichtbar zu machen

### Definition of Done

- React-Wrapper baut sauber.
- React-Wrapper und React-Test-App deklarieren alle direkt verwendeten Build-, Runtime- und Test-Dependencies selbst.
- Nicht mehr benötigte React- und React-spezifische Vite-Pakete sind aus dem Root entfernt.
- Gemeinsam verwendete React- und Vite-Versionen werden über Catalog-Referenzen bezogen; öffentliche React-Peer-Ranges bleiben explizit gepflegt.

## Welle 5: Vue

### Ziel

Vue-Consumer-Pfad auf eine aktuelle stabile 3.x-Linie bringen.

### Scope

- `vue`
- `@vitejs/plugin-vue`
- `vue-tsc`
- `@vue/test-utils`
- Vue-Test-App
- Vue-Wrapper
- Vue- und Vue-spezifische Vite-Dependencies aus dem Root in die direkt verantwortlichen Pakete verschieben
- gemeinsame Vue- und Vue-spezifische Vite-Versionen im Vue-Catalog zentralisieren

### Validierung

- `pnpm run build:vue`

### Definition of Done

- Vue-Wrapper baut sauber.
- Vue-Wrapper und Vue-Test-App deklarieren alle direkt verwendeten Build-, Runtime- und Test-Dependencies selbst.
- Nicht mehr benötigte Vue- und Vue-spezifische Vite-Pakete sind aus dem Root entfernt.
- Gemeinsam verwendete Vue-Versionen werden über Catalog-Referenzen bezogen; die öffentliche Vue-Peer-Range bleibt explizit gepflegt.

## Welle 6: Storybook und Doku-Nachlauf

### Ziel

Alle Dokumentations- und Release-Artefakte nachziehen, nachdem die technischen Wellen abgeschlossen sind.

### Scope

- Storybook-bezogene Dependencies
- Doku-Build
- relevante Story-Anpassungen
- alle `tsconfig`-Dateien am Ende noch einmal auf temporäre Upgrade-Hilfen und veraltete Compileroptionen prüfen
- temporäre TypeScript-Kompatibilitätsschalter wie `"ignoreDeprecations": "6.0"` entfernen, sobald die eigentlichen Ursachen bereinigt sind
- Changelog für den gemeinsamen Major-Release erstellen
- Versionsanhebung über das bestehende Versionsskript erst jetzt durchführen
- Storybook-Dependencies vollständig in `docs/` verankern
- abschließendes Dependency-Ownership-Audit für alle Workspace-Pakete durchführen
- verbleibende paketlokal verwendete Framework-, Build- und Testwerkzeuge aus dem Root entfernen
- gemeinsame Toolchain-, Storybook- und verbleibende Stencil-/Output-Target-Versionen in pnpm-Catalogs überführen
- ungenutzte oder doppelte Catalog-Einträge entfernen und Catalog-Namen vereinheitlichen

### Validierung

- `pnpm run build:storybook`
- `pnpm install --frozen-lockfile`
- alle von geänderten Catalog-Einträgen betroffenen Buildpfade

### Definition of Done

- Storybook baut sauber.
- `tsconfig`-Dateien sind überprüft; temporäre Upgrade-Einträge wie `"ignoreDeprecations": "6.0"` sind entfernt, sofern kein nachweisbarer technischer Grund mehr dagegen spricht.
- Changelog und Release-Notizen sind vollständig.
- Major-Version kann konsistent angehoben werden.
- Kein Workspace-Paket ist für direkt importierte Pakete oder aufgerufene Binaries auf Root-Hoisting angewiesen.
- Der Root enthält nur Orchestrierung und nachweislich repo-weite Werkzeuge.
- Gemeinsam verwendete interne Versionen sind in `pnpm-workspace.yaml` katalogisiert und werden in den Paketmanifesten über Catalog-Referenzen verwendet.
- Öffentliche Peer-Ranges und interne `workspace:*`-Abhängigkeiten sind nicht durch Catalog-Referenzen ersetzt.
- Der Lockfile ist nach der vollständigen Catalog-Migration mit `pnpm install --frozen-lockfile` reproduzierbar.

## Empfohlene PR-Reihenfolge

1. Welle 1: Infrastruktur und Tooling
2. Welle 2: Stencil plus Output-Targets
3. Welle 3: Angular 22
4. Welle 4: React und Vite
5. Welle 5: Vue
6. Welle 6: Storybook, Doku, Release

## Praktische Arbeitsweise pro PR

Für jede Welle:

1. Zielversionen vorab festlegen, nicht blind auf `latest` springen.
2. Nur die Pakete dieser Welle anheben.
3. Lockfile aktualisieren.
4. Relevante Builds lokal ausführen.
5. Erst bei vollständig grünem Zustand die PR abschließen.

## Noch offene bewusste Annahmen

Diese Annahmen stecken in diesem Plan und sollten nur geändert werden, wenn es dafür einen expliziten Gegenentscheid gibt:

- Angular 22 bleibt das Primärziel.
- TypeScript und Vite bleiben bewusst aus Welle 1 heraus.
- Der lokale Angular-Fork ist Teil des Upgrade-Pfads und kein Ausnahmekandidat.
- Es gibt keine automatische Update-Automation nach diesem Projekt; die Pflege bleibt manuell.
- Release-Version und exakte Endversion werden erst nach erfolgreicher letzter Welle festgelegt.
