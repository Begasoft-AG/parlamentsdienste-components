# Dependency Upgrade Plan

## Zielbild

Dieses Upgrade-Programm verfolgt einen bewussten Major-Update-Pfad mit mehreren kleinen PRs und einem gemeinsamen Major-Release am Ende.

Festgelegte Leitplanken:

-   Support-Matrix darf angehoben werden.
-   Angular 22 ist das Ziel.
-   Mehrere fokussierte PRs statt eines Sammel-PRs.
-   Ein gemeinsamer Major-Release erst nach Abschluss aller Wellen.
-   Keine dauerhaften Peer-Dependency-Workarounds.
-   Kritische Wellen bekommen neben der normalen CI zusätzliche Compat-Tests.
-   Jede Welle hat eine harte Definition of Done.
-   Jede Welle bleibt fachlich fokussiert, darf aber kleine notwendige Folgeänderungen im direkten Abhängigkeitsradius enthalten.

## Ziel-Support-Matrix

Diese Matrix ist der Zielzustand nach Abschluss aller Wellen:

-   Node: 22 und 24, beide in CI oder in expliziten Wellen-Checks validiert
-   pnpm: eindeutig über Root-`packageManager` gepinnt und lokal/CI konsistent
-   Angular: 22 als Primärziel
-   React: 19 auf aktuellem Stable-Patch-Level
-   Vue: 3 auf aktuellem Stable-Patch-Level
-   Ziel-Kompatibilität, falls bestätigt: Angular 20 - 22, React 18 - 19, Vue ab einer konkret getesteten 3.4.x-Untergrenze bis <4
-   Browser-Support: unverändert, solange keine fachliche Anforderung etwas anderes verlangt

## Release-Strategie

-   Umsetzung in mehreren PRs entlang der Upgrade-Wellen
-   Kein Zwischenrelease der Bibliothek pro Welle
-   Versionserhöhung und Changelog-Eintrag erst am Ende
-   Gemeinsamer Release als neuer Major nach erfolgreichem Abschluss aller Wellen
-   Der Major-Release ist blockiert, solange Zielkombinationen der Compat-Matrix noch `not-tested` sind oder Peer-Ranges breiter sind als die bestätigten Ergebnisse.

## Allgemeine Regeln pro Welle

Eine Welle gilt nur dann als abgeschlossen, wenn alle folgenden Punkte erfüllt sind:

-   `pnpm install` läuft ohne Ausweichmechanismen wie `--legacy-peer-deps`.
-   Keine relevanten offenen Peer-Dependency-Konflikte bleiben zurück.
-   Der Lockfile ist reproduzierbar und konsistent.
-   Alle zur Welle gehörenden Builds laufen erfolgreich.
-   Alle zur Welle gehörenden Tests laufen erfolgreich.
-   Falls die Welle als kritisch eingestuft ist, ist zusätzlich ein Compat-Test gegen die Zielversion erfolgreich.
-   Offizielle Support-Ranges und `peerDependencies` dürfen nur Kombinationen abbilden, die tatsächlich bestätigt wurden.
-   Compat-Tests mit `--legacy-peer-deps` oder vergleichbaren Flags zählen nur als Diagnose, nie als Support-Nachweis.
-   Compat-Tests nennen Framework-, Node- und Vite-Versionen explizit; `latest` ist kein reproduzierbarer Release-Nachweis.
-   Bekannte Warnungen oder Brüche werden nicht stillschweigend in die nächste Welle verschoben.

## CI- und Validierungsgrundlage

Bestehende harte Prüfpfade im Repo:

-   Core/Stencil: `pnpm run build:angular-output-target`, `pnpm run build:core`, `pnpm run test:core`
-   Wrapper-E2E: `pnpm run build:all`, `pnpm run test:angular`, `pnpm run test:react`, `pnpm run test:vue`
-   Storybook: `pnpm run build:storybook` lokal oder als CI-Check; der bestehende Docker-Publish-Workflow ersetzt diesen Build-Check nicht.
-   Consumer-Kompatibilität: `tools/compat/*`

## Support-Aussage und Compat-Matrix

Die öffentliche Support-Aussage folgt nicht aus einer beabsichtigten Ziel-Range, sondern ausschließlich aus bestätigten Testresultaten.

-   Die Dokumentation zeigt explizit, was funktioniert, was nicht funktioniert und was nicht getestet wurde.
-   `peerDependencies` werden am Ende nur so breit gesetzt, wie die Compat-Matrix die Kombinationen tatsächlich bestätigt.
-   Für Vue wird die Untergrenze nicht pauschal als `3.4.x` behauptet, sondern auf die konkret getestete Untergrenze festgezogen.
-   Wenn eine gewünschte Kombination nicht bestätigt werden kann, wird sie nicht als unterstützt kommuniziert.

Für jede bestätigte oder verworfene Kombination wird mindestens festgehalten:

| Kombination     | Node | Consumer-Paketmanager | Zusatzversionen   | E2E | Status     | Nachweis |
| --------------- | ---- | --------------------- | ----------------- | --- | ---------- | -------- |
| Angular 20      | 24   | npm                   | -                 | ja  | not-tested | -        |
| Angular 21      | 24   | npm                   | -                 | ja  | not-tested | -        |
| Angular 22      | 24   | npm                   | -                 | ja  | not-tested | -        |
| Angular 22      | 22   | npm                   | -                 | ja  | not-tested | -        |
| React 19        | 24   | npm                   | Vite: festzulegen | ja  | not-tested | -        |
| React 19        | 22   | npm                   | Vite: festzulegen | ja  | not-tested | -        |
| React 18        | 24   | npm                   | Vite: festzulegen | ja  | not-tested | -        |
| Vue Untergrenze | 24   | npm                   | Vite: festzulegen | ja  | not-tested | -        |
| Vue aktuell     | 24   | npm                   | Vite: festzulegen | ja  | not-tested | -        |
| Vue aktuell     | 22   | npm                   | Vite: festzulegen | ja  | not-tested | -        |

Der finale Major-Release setzt mindestens eine bestätigte oder bewusst als nicht kompatibel dokumentierte Bewertung für die Zielmatrix voraus:

-   Angular 20
-   Angular 21
-   Angular 22
-   React 18
-   React 19
-   Vue auf der konkret getesteten Untergrenze
-   Vue auf einer aktuellen 3.x-Version

## Welle 1: Infrastruktur und Tooling

### Ziel

Die Laufzeit- und Build-Umgebung fixieren, damit spätere Fehler aus echten Dependency-Änderungen kommen und nicht aus einer driftenden Toolchain.

### Scope

In diese Welle gehören:

-   Node- und pnpm-Pinning bereinigen
-   Root-`packageManager` setzen
-   `.npmrc` und `engines` mit dem Node-/pnpm-Zielbild abgleichen
-   CI-Versionen für Node und pnpm explizit konsistent halten
-   CI-Checks mindestens für Node 24 ausführen und Node 22 entweder als Matrix oder als dokumentierten Wellen-Check ergänzen
-   GitHub Actions aktualisieren, soweit sie die Build- und Test-Toolchain betreffen
-   Storybook-Build als echten Build-Check absichern, falls er release-blockierend bleiben soll
-   Install-Reproduzierbarkeit und Lockfile-Disziplin absichern
-   Kleine Tooling-Updates rund um ESLint/Prettier und ähnliche Low-Risk-Basiswerkzeuge

Bewusst nicht in diese Welle:

-   TypeScript-Major-Updates
-   Vite-Major-Updates
-   Vitest-Major-Updates
-   Framework-spezifische Builder-Sprünge
-   Angular-, React-, Vue- oder Stencil-nahe Paketgruppen

### Erwartete Dateien

-   `package.json`
-   `.github/workflows/*.yml`
-   optional `.npmrc` oder ergänzende Toolchain-Dateien, falls nötig

### Validierung

-   `pnpm install --frozen-lockfile`
-   `pnpm install`
-   bei Änderungen an CI-relevanten Skripten zusätzlich mindestens `pnpm run build:angular-output-target`
-   falls Node 22 nicht in CI läuft: mindestens ein dokumentierter Install-/Build-Check mit Node 22

### Definition of Done

-   Toolchain ist lokal und in CI eindeutig festgelegt.
-   Installation läuft sauber.
-   Kein späterer Wellenfehler kann plausibel auf unklare Node-/pnpm-Bedingungen zurückgeführt werden.

## Welle 2: Stencil plus Output-Targets

### Ziel

Core und Generierungsbasis modernisieren, ohne Angular/React/Vue vorschnell mit einem großen Querschnittswechsel zu vermischen.

### Scope

-   `@stencil/core`
-   `@stencil/react-output-target`
-   `@stencil/vue-output-target`
-   Stencil-nahe Pakete im Core
-   eigener Angular-Output-Target-Fork, soweit für die neue Stencil-Version nötig

### Besondere Risiken

-   Der lokale Fork in `libs/angular-output-target/` ist ein aktiver Teil der Generierungskette.
-   `build:core` hängt implizit an vorgebauten Workspace-Artefakten.
-   Generierte Wrapper-Dateien dürfen nicht manuell editiert werden.

### Validierung

-   `pnpm run build:angular-output-target`
-   `pnpm run build:core`
-   `pnpm run test:core`
-   danach gezielter Compat-Test für den Core-Consumer-Pfad

### Definition of Done

-   Core baut sauber.
-   Stencil-Tests sind grün.
-   Output-Targets erzeugen die erwarteten Wrapper-Artefakte.
-   Keine regressiven Build- oder Generierungsfehler im Wrapper-Pfad.

## Welle 3: Angular-Stack

### Ziel

Angular im gesamten Repo auf 22 anheben.

### Scope

-   Root-Angular-Pakete
-   Angular CLI, Devkit, Builder, Compiler, Forms, Router, Language Service
-   TypeScript, soweit Angular 22 eine andere TypeScript-Range verlangt
-   `@analogjs/vite-plugin-angular`
-   `@analogjs/vitest-angular`
-   `packages/angular/`
-   `apps/angular-test/`
-   `libs/angular-output-target/`

### Besondere Risiken

-   Angular 22 ist ein bewusstes Ziel und kein optionales Stretch-Target.
-   Der lokale Fork darf aktiv angepasst werden, wenn Angular 22 dort Brüche erzeugt.
-   Peer-Dependency-Konflikte dürfen nicht mit dauerhaften Workarounds zugedeckt werden.

### Validierung

-   `pnpm run build:angular-output-target`
-   `pnpm run build:core`
-   `pnpm run build:angular`
-   `pnpm run build:all`
-   `pnpm run test:angular`
-   Angular-Compat-Test gegen Version 22 mit E2E
-   Angular-Compat-Test gegen Node 22 oder CI-Nachweis, dass Angular 22 auch auf Node 22 läuft

Beispiel:

```bash
cd tools/compat/angular
./run.sh --e2e angular-22
```

### Definition of Done

-   Angular 22 läuft im Monorepo sauber.
-   Angular-Wrapper baut und funktioniert.
-   Angular-Test-App besteht.
-   Compat-Test gegen Angular 22 ist grün.
-   Angular 20 und 21 werden vor Freigabe der finalen Peer-Range als separate Zielkombinationen bewertet, wenn sie Teil der offiziellen Support-Range sein sollen.
-   Angular 17 - 19 werden entweder bestätigt, bewusst ausgeschlossen oder aus der finalen Peer-Range entfernt.
-   Keine offenen Peer-Konflikte in Angular-relevanten Paketen.

## Welle 4: React und Vite

### Ziel

React- und Vite-bezogene Pakete auf eine aktuelle stabile Linie bringen, nachdem Core und Angular bereits stabilisiert sind.

### Scope

-   `react`, `react-dom`, `@types/react`, `@types/react-dom`
-   `vite`
-   `@vitejs/plugin-react`
-   React-Test-App
-   React-Wrapper
-   nur die dafür nötigen Nebentools

### Besondere Risiken

-   Vite ist kein reines React-Detail; Änderungen können Vue-, Storybook- und Test-Tooling-Pfade beeinflussen.
-   React 18 bleibt nur in der Peer-Range, wenn der Compat-Test gegen React 18 erfolgreich ist.

### Validierung

-   `pnpm run build:react`
-   `pnpm run test:react`
-   React-Compat-Test gegen Zielversion und festgelegte Vite-Version
-   bei Vite-Major-Update zusätzlich mindestens ein Vue- oder Storybook-Smoke-Build, um Quereffekte sichtbar zu machen

### Definition of Done

-   React-Wrapper baut sauber.
-   React-Test-App und E2E sind grün.
-   Compat-Test ist mit expliziter React-, Node- und Vite-Version grün.
-   React 18 wird zusätzlich als separate Zielkombination bewertet, wenn es Teil der offiziellen Support-Range bleiben soll.

## Welle 5: Vue

### Ziel

Vue-Consumer-Pfad auf eine aktuelle stabile 3.x-Linie bringen.

### Scope

-   `vue`
-   `@vitejs/plugin-vue`
-   `vue-tsc`
-   `@vue/test-utils`
-   Vue-Test-App
-   Vue-Wrapper

### Validierung

-   `pnpm run build:vue`
-   `pnpm run test:vue`
-   Vue-Compat-Test gegen die Zielversion mit expliziter Node- und Vite-Version

### Definition of Done

-   Vue-Wrapper baut sauber.
-   Vue-Test-App und E2E sind grün.
-   Compat-Test ist mit expliziter Vue-, Node- und Vite-Version grün.
-   Die untere Vue-Unterstützungsgrenze wird nur auf die konkret getestete 3.4.x-Version gesetzt.

## Welle 6: Storybook und Doku-Nachlauf

### Ziel

Alle Dokumentations- und Release-Artefakte nachziehen, nachdem die technischen Wellen abgeschlossen sind.

### Scope

-   Storybook-bezogene Dependencies
-   Doku-Build
-   relevante Story-Anpassungen
-   Support-Matrix in der Dokumentation explizit festschreiben
-   `peerDependencies` auf die bestätigte Support-Matrix zurückschneiden oder erweitern
-   Changelog für den gemeinsamen Major-Release erstellen
-   Versionsanhebung über das bestehende Versionsskript erst jetzt durchführen

### Validierung

-   `pnpm run build:storybook`
-   Sichtprüfung der kritischen Stories für Angular, React, Vue und ausgewählte Core-Komponenten

### Definition of Done

-   Storybook baut sauber.
-   Doku entspricht der neuen Support-Matrix.
-   `peerDependencies` widersprechen der Support-Matrix nicht.
-   Changelog und Release-Notizen sind vollständig.
-   Major-Version kann konsistent angehoben werden.

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
4. Relevante Builds und Tests lokal ausführen.
5. Bei kritischen Wellen zusätzlich Compat-Test mit expliziten Versionen ausführen.
6. Erst bei vollständig grünem Zustand die PR abschließen.

## Noch offene bewusste Annahmen

Diese Annahmen stecken in diesem Plan und sollten nur geändert werden, wenn es dafür einen expliziten Gegenentscheid gibt:

-   Angular 22 bleibt das Primärziel.
-   TypeScript und Vite bleiben bewusst aus Welle 1 heraus.
-   Der lokale Angular-Fork ist Teil des Upgrade-Pfads und kein Ausnahmekandidat.
-   Es gibt keine automatische Update-Automation nach diesem Projekt; die Pflege bleibt manuell.
-   Offizielle Support-Ranges und `peerDependencies` folgen der bestätigten Compat-Matrix und nicht einer vorab gewünschten Breite.
-   Release-Version und exakte Endversion werden erst nach erfolgreicher letzter Welle festgelegt.
