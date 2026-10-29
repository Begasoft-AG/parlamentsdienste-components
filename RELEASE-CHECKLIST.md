# Release-Checkliste

Für die gemeinsame Veröffentlichung von Core, Angular-, React- und Vue-Wrapper.
Alle Befehle im Repository-Root ausführen. Kästchen erst nach erfolgreicher Prüfung abhaken;
nicht zutreffende Punkte mit Begründung markieren.

- Zielversion:
- Release-Datum:
- Geprüfter Commit:
- Verantwortliche Person:

## 1. Release vorbereiten

- [ ] Release-Umfang festlegen und Änderungen seit dem letzten Release prüfen.
- [ ] Version nach Semantic Versioning bestimmen: Patch für Fehlerkorrekturen, Minor für rückwärtskompatible neue Funktionen, Major für Breaking Changes.
- [ ] Breaking Changes und nötige Anpassungen für Anwender dokumentieren.
- [ ] Arbeitsstand mit `git status --short` erfassen; keine fremden oder unfertigen Änderungen versehentlich aufnehmen.
- [ ] Node und pnpm gemäss [package.json](./package.json) verwenden: aktuell Node `>=24.15.0 <25` und pnpm `11.23.0`.
- [ ] Zugriff auf die vorgesehene npm-Registry und Publish-Berechtigungen für alle vier Produktpakete prüfen; keine Zugangsdaten ins Repository aufnehmen.

## 2. Versionen und Changelog aktualisieren

- [ ] Versionsskript ausführen und die Zielversion eingeben:

    ```bash
    pnpm run update-versions
    ```

- [ ] Root sowie Core, Angular, React und Vue haben dieselbe Zielversion.
- [ ] Interne Abhängigkeiten der Wrapper verweisen auf die passende Core-Version.
- [ ] Beachten: [update-versions.ts](./tools/update-versions.ts) lässt `workspace:`-Referenzen unverändert und aktualisiert weder Changelog noch Lockfile oder Kompatibilitätsmatrix.
- [ ] Lockfile nach den Versionsänderungen aktualisieren und die Änderungen prüfen:

    ```bash
    pnpm install --lockfile-only
    ```

- [ ] In [changelog.md](./changelog.md) die freizugebenden Einträge aus `Unreleased` unter `[VERSION] - YYYY-MM-DD` einordnen; `Unreleased` für spätere Änderungen beibehalten.
- [ ] Changelog auf Vollständigkeit prüfen: neue Funktionen, Fehlerkorrekturen, Verhaltensänderungen und Breaking Changes.
- [ ] Release-Link am Ende des Changelogs ergänzen: `https://github.com/Begasoft-AG/parlamentsdienste-components/releases/tag/vVERSION`.
- [ ] Keine Platzhalter oder ungeklärten Releasedaten im neuen Release-Eintrag belassen.

## 3. Komponenten, Wrapper und Dokumentation prüfen

- [ ] Komponentenlogik liegt in [packages/core/src/components/](./packages/core/src/components/), nicht in generierten Wrappern.
- [ ] Neue oder geänderte Properties, Events, Methoden und Typen werden in allen drei Frameworks korrekt angeboten.
- [ ] Bei neuen oder geänderten Form Controls die Angular- und Vue-Mappings in [stencil.config.ts](./packages/core/stencil.config.ts) sowie Angulars `INPUTMAP` in [value-accessor.ts](./packages/angular/src/lib/angular/value-accessor.ts) abgleichen.
- [ ] Generierte React-/Vue-Wrapper und Angular-Proxys nicht von Hand ändern; sie werden beim Core-Build neu erzeugt.
- [ ] Storybook-Beispiele und API-Dokumentation in [docs/stories/](./docs/stories/) aktualisieren; neue Komponenten, Events und CSS-Variablen berücksichtigen.
- [ ] Unterstützte Frameworkversionen zwischen Peer-Dependencies, Setup-Anleitungen und [Kompatibilitätsmatrix](./docs/stories/compatibility.mdx) abgleichen.
- [ ] Lizenzangaben, Repository-URL und Publish-Metadaten der Produktpakete prüfen; Root, Test-Apps und interne Build-Werkzeuge nicht versehentlich mitveröffentlichen.

## 4. Reproduzierbar bauen

- [ ] Vorhandene Build-Ausgaben gezielt entfernen, Abhängigkeiten reproduzierbar installieren und vollständig bauen:

    ```bash
    pnpm run clean:dist
    pnpm install --frozen-lockfile
    pnpm run build:all
    ```

- [ ] Build-Reihenfolge ist vollständig: lokaler Angular Output Target, Core, Angular, React, Vue, Storybook.
- [ ] Alle Builds sind erfolgreich; neue Warnungen prüfen und gegebenenfalls beheben.
- [ ] Erwartete Ausgaben und generierte Wrapper sind vorhanden; neue Änderungen gegenüber dem erfassten Git-Ausgangszustand prüfen.
- [ ] Generierte Dateien nur dann in den Release-Commit aufnehmen, wenn sie im Repository versioniert werden.

**Wichtig:** `pack:all` und `publish:all` führen keinen Build aus. Nach Änderungen an
Quellcode, Versionen oder Paketmetadaten erneut bauen, betroffene Tests wiederholen,
neu packen und die neuen Tarballs erneut prüfen.

## 5. Automatisierte Tests ausführen

- [ ] Chromium für die Wrapper-E2E-Tests installieren, falls noch nicht vorhanden:

    ```bash
    pnpm --filter angular-test exec playwright install chromium
    ```

- [ ] Core-Tests und alle Wrapper-E2E-Tests erfolgreich ausführen:

    ```bash
    pnpm run test:core
    pnpm run test:angular
    pnpm run test:react
    pnpm run test:vue
    ```

- [ ] Wrapper-Tests nacheinander ausführen. Alle drei Playwright-Konfigurationen nutzen Port `4200` und können einen vorhandenen Server wiederverwenden; vor jedem Lauf sicherstellen, dass kein Server einer anderen Test-App läuft.
- [ ] GitHub Actions für den endgültigen Release-Commit prüfen: [Stencil-Tests](./.github/workflows/stencil-tests.yml) und [Wrapper-E2E-Tests](./.github/workflows/wrapper-e2e.yml) sind erfolgreich.
- [ ] Fehlgeschlagene oder übersprungene erforderliche Prüfungen nicht als bestanden behandeln.

## 6. Framework-Kompatibilität bestätigen

- [ ] Docker bereitstellen und die für den Release zugesagten Kombinationen mit den [Kompatibilitätstests](./tools/compat/README.md) prüfen. Sie laufen nicht automatisch in GitHub Actions.
- [ ] Aktuelle Peer-Bereiche berücksichtigen: Angular 19–22, React 18–19 und Vue `>=3.4.38 <4`.
- [ ] Framework-, Node- und gegebenenfalls create-vite-Version bewusst wählen und im Prüfergebnis festhalten. Beispielaufrufe, keine vollständige Testmatrix:

    ```bash
    ./tools/compat/angular/run.sh 22 --node-version=24.18.0 --e2e
    ./tools/compat/react/run.sh 19 --node-version=24.18.0 --e2e
    ./tools/compat/vue/run.sh 3.5.39 --node-version=24.18.0 --e2e
    ```

- [ ] Auch die unteren unterstützten Versionen prüfen, soweit deren Unterstützung für den Release zugesagt wird; passende Node-Versionen verwenden.
- [ ] Peer-Konflikte nicht mit `--legacy-peer-deps` als erfolgreiche reguläre Kompatibilität deklarieren.
- [ ] In der [Kompatibilitätsmatrix](./docs/stories/compatibility.mdx) nur tatsächlich bestätigte Kombinationen für die Zielversion als kompatibel eintragen; ungeprüfte Kombinationen entsprechend kennzeichnen.
- [ ] Beachten: Die Docker-Tests bauen und packen eigene Artefakte. Sie ersetzen nicht die Prüfung der später lokal veröffentlichten Tarballs.
- [ ] Nach Änderungen an der Kompatibilitätsdokumentation Storybook erneut bauen.

## 7. Manuelle Abnahme durchführen

- [ ] Storybook öffnen und geänderte Komponenten visuell sowie funktional prüfen:

    ```bash
    pnpm run start:storybook
    ```

- [ ] Tastaturbedienung, Fokusführung, Labels, Disabled-/Readonly-Zustände und Fehlermeldungen bei betroffenen Komponenten prüfen.
- [ ] Angular-Formulare, React-Controlled-Components und Vue-`v-model` für betroffene Form Controls prüfen.
- [ ] CSS, Icons und Schriften werden geladen; keine unerwarteten globalen Styles oder Browser-Konsolenfehler.
- [ ] Darstellung in den für den Release vorgesehenen Browsern und Bildschirmgrössen abnehmen; die Wrapper-E2E-Tests decken aktuell nur Chromium ab.

### Zusätzliche Regressionen für die aktuell vorbereiteten Änderungen

Ausgehend vom aktuellen `Unreleased`-Abschnitt und dem bereitgestellten Changelog:

- [ ] `pd-pagination`: Seitenübersicht und nummerierte Buttons, einbasierter Wert in `pd-change`, Aktualisierung von `currentPage` durch den Parent und Integration in `pd-table`.
- [ ] `pd-input`, `pd-search`, `pd-textarea`: keine doppelten Change-Events beim Zurückschreiben gebundener Werte mit anderem Typ.
- [ ] `pd-table`: vor Initialisierung gesetzte Zeilen, `null`-Zeilen, extern gesteuerte Auswahl, leere Tabelle und Sortierrichtung.
- [ ] `PdTableRow`: einfache Zeilenobjekte ohne Type-Cast und partielle Icon-Konfigurationen in Consumer-Code verwendbar.
- [ ] Labels, Abstände und vertikale Ausrichtung der Form Controls, Shadow-DOM-Isolation, Timeline-Typografie und Schriften gezielt mit der erwarteten Darstellung vergleichen.

## 8. Genau die Release-Pakete prüfen

- [ ] Nach den letzten Änderungen einen vollständigen Build ausführen und die finalen Tarballs erzeugen:

    ```bash
    pnpm run build:all
    pnpm run pack:all
    ```

- [ ] Unter `dist/core/`, `dist/angular/`, `dist/react/` und `dist/vue/` liegt jeweils genau ein Tarball der Zielversion; keine alten Release-Artefakte verwenden.
- [ ] Inhalt und Paketmetadaten jedes Tarballs prüfen, nicht nur die Quelldateien. Beim Angular-Paket insbesondere die von `ng-packagr` erzeugten Metadaten kontrollieren.
- [ ] Alle exportierten Entry-Points und Typdeklarationen sind enthalten und auflösbar; Core-Loader, Custom Elements, Utilities, CSS und benötigte Assets sind vorhanden.
- [ ] Gepackte Abhängigkeiten enthalten keine unaufgelösten `workspace:`-/`catalog:`-Referenzen oder lokalen Dateipfade.
- [ ] README und Lizenz sind enthalten; Paketgrössen plausibel; keine Secrets, lokalen Konfigurationen, Testberichte oder unbeabsichtigten Dateien im Paket.
- [ ] Die finalen Tarballs in frischen Consumer-Projekten für Angular, React und Vue installieren; Imports, TypeScript-Build, Styles und grundlegende Interaktion prüfen.
- [ ] Für alle vier finalen Tarballs eine Publish-Simulation durchführen:

    ```bash
    VERSION=$(node -p "require('./package.json').version")
    npm publish --dry-run --ignore-scripts "dist/core/parlamentsdienste-pdcomponents-core-${VERSION}.tgz"
    npm publish --dry-run --ignore-scripts "dist/angular/parlamentsdienste-pdcomponents-angular-${VERSION}.tgz"
    npm publish --dry-run --ignore-scripts "dist/react/parlamentsdienste-pdcomponents-react-${VERSION}.tgz"
    npm publish --dry-run --ignore-scripts "dist/vue/parlamentsdienste-pdcomponents-vue-${VERSION}.tgz"
    ```

- [ ] Dry-Runs sind erfolgreich; beachten: Sie garantieren weder Publish-Berechtigungen noch, dass die Version in der Registry noch frei ist.
- [ ] Optional den [Release-Readiness-Skill](./.github/skills/release-readiness-pr-fen/SKILL.md) manuell ausführen. Er ergänzt die lokale Build-/Paketprüfung, ersetzt aber weder Tests noch die Prüfung der Remote-CI.

## 9. Freigabe vor dem Publish

- [ ] Alle erforderlichen Prüfungen sind erfolgreich; offene Blocker behoben und verbleibende Hinweise dokumentiert.
- [ ] Release-Änderungen sind geprüft und committed; der veröffentlichte Stand entspricht exakt dem geprüften Commit.
- [ ] Zielversion ist für keines der vier Pakete bereits veröffentlicht; Ziel-Registry, npm-Anmeldung und gegebenenfalls 2FA sind geklärt.
- [ ] Dist-Tag festlegen: reguläres Release üblicherweise `latest`, Vorabversion beispielsweise `next`.
- [ ] Git-Tag `vVERSION` ist noch frei; Release-Notes und GitHub-Release für denselben Commit vorbereiten.
- [ ] Nach der abschliessenden Prüfung weder Quellen noch Tarballs verändern. Bei Änderungen die betroffenen Prüfungen wiederholen.
- [ ] Storybook-Veröffentlichung vorbereiten: Der [Workflow](./.github/workflows/storybook-build.yml) wird manuell gestartet; den tatsächlich erzeugten Image-Tag und den vorgesehenen Deployment-Ablauf prüfen.

## 10. Veröffentlichung und Nachkontrolle

Erst nach ausdrücklicher Freigabe ausführen, nicht als Teil der Vorabprüfung.

- [ ] Für einen regulären Release mit dem vorgesehenen Standard-Dist-Tag genau die geprüften Tarballs veröffentlichen:

    ```bash
    pnpm run publish:all
    ```

- [ ] Bei Vorabversionen die Tarballs stattdessen einzeln mit explizitem `npm publish … --tag next` veröffentlichen; das unveränderte `publish:all` setzt keinen eigenen Dist-Tag.
- [ ] Bei teilweisem Publish stoppen und den Registry-Stand prüfen. Nur fehlende Pakete derselben geprüften Version veröffentlichen; keine bereits veröffentlichte Version überschreiben.
- [ ] Alle vier Pakete samt Version und Dist-Tag in der Registry prüfen; Installation aus der Registry in einem frischen Consumer-Projekt bestätigen.
- [ ] Git-Tag `vVERSION` auf dem geprüften Commit erstellen/pushen und GitHub-Release mit Changelog veröffentlichen.
- [ ] Storybook-Image für denselben Release-Stand bauen, deployen und die [öffentliche Dokumentation](https://parlamentsdienste-components.prod.sw.begasoft.ch) kontrollieren.
- [ ] Release kommunizieren, insbesondere Breaking Changes, Migration und bestätigte Framework-Kompatibilität.
