---
name: Release-Readiness prüfen
description: Prüft lokalen Build, Paketmetadaten und Publish-Artefakte vor einem Release, ohne zu veröffentlichen
author: GitHub Copilot
agent: agent
---

# Release-Readiness prüfen

Prüfe, ob dieses Repository lokal für die Veröffentlichung der vier Produktpakete vorbereitet ist. Arbeite selbstständig und lies zuerst die Repository-Anweisungen sowie die aktuellen Release-, Build-, Pack- und Publish-Skripte.

## Sicherheitsgrenzen

- Führe niemals einen echten Publish, Commit, Tag oder Push aus.
- Stage keine Dateien.
- Führe keine Compat-, Core- oder Wrapper-E2E-Tests aus.
- Prüfe keine Remote-Branches und keine GitHub-CI-Ergebnisse.
- Gib gefundene Secrets oder verdächtige Werte niemals aus. Nenne nur Dateipfad, Zeile und Geheimnistyp in redigierter Form.
- Vorhandene lokale Änderungen sind erlaubt und dürfen nicht verworfen oder überschrieben werden.
- Erfasse vor dem Build den Git-Ausgangszustand. Melde nur zusätzliche, unerwartete Änderungen als Problem.
- Kleine, eindeutig sichere Fehler darfst du beheben. Validiere sie anschließend erneut.

## Prüfablauf

1. **Versionen und Changelog**
    - Leite die Zielversion aus der Root-`package.json` ab.
    - Prüfe Root sowie Core-, Angular-, React- und Vue-Paket auf dieselbe Version.
    - Prüfe interne Abhängigkeiten, Changelog-Eintrag, Releasedatum und Release-Link.

2. **Paketmetadaten**
    - Prüfe `name`, `version`, `license`, `repository`, `publishConfig`, `dependencies`, `peerDependencies`, `exports`, `types`, `files` und `sideEffects`.
    - Prüfe Entry-Points, Deklarationen und unterstützte Frameworkversionen.
    - Stelle sicher, dass private oder interne Pakete nicht versehentlich veröffentlicht werden.
    - Vergleiche die dokumentierten Ergebnisse in `docs/stories/compatibility.mdx` mit Peer-Dependencies und Paketmetadaten. Starte keine Compat-Tests.

3. **Reproduzierbarer Build**
    - Erfasse den Git-Ausgangszustand.
    - Führe `pnpm run clean:dist` aus.
    - Führe `pnpm install --frozen-lockfile` aus.
    - Führe `pnpm run build:all` aus.
    - Prüfe, ob alle erwarteten Ausgaben und generierten Wrapper vorhanden sind.
    - Vergleiche den Git-Zustand mit der Baseline und melde neue unerwartete Diffs.

4. **Release-Artefakte**
    - Führe `pnpm run pack:all` aus.
    - Prüfe, ob vier korrekt versionierte Tarballs unter `dist/` erzeugt wurden.
    - Inspiziere Inhalt und Metadaten jedes Tarballs.
    - Prüfe Entry-Points, Deklarationen, CSS, Assets und Paketgrößen.
    - Suche nach alten Tarballs, unnötigen Quellen, Secrets und lokalen Dateien.

5. **Publish-Simulation**
    - Führe für jeden neu erzeugten Tarball `npm publish --dry-run --ignore-scripts` aus.
    - Veröffentliche unter keinen Umständen ein Paket.

6. **Dokumentation und Infrastruktur**
    - Vergleiche die Release-Anleitung im Root-README mit den aktuellen Skripten.
    - Prüfe Changelog, CI und Storybook-Dockerfile auf korrekte Build-Vorstufen.
    - Prüfe, ob verbliebene Nx-Dateien oder Nx-Referenzen den pnpm-Build beeinflussen.

## Ergebnis

Gib kein binäres Ready/Not-Ready-Urteil aus. Berichte kompakt und in dieser Reihenfolge:

1. **Blocker**
2. **Warnungen**
3. **Erfolgreich geprüft**
4. **Bewusst nicht geprüft**
5. **Durchgeführte Fixes**
6. **Nächste Schritte**

Belege Befunde mit klickbaren Dateipfaden und den entscheidenden Befehlsausgaben. Unterscheide klar zwischen Release-Blockern, Hinweisen und bewusst ausgeschlossenen Prüfungen.
