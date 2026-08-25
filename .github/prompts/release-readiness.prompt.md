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

6. **Security und Supply Chain**
    - Suche in getrackten Dateien, Git-Historie und allen Tarballs nach Secrets: Tokens, Zugangsdaten, private Schlüssel, `.env`-Inhalte, Registry-Credentials und eingebettete Authentifizierung in URLs. Verwende `gitleaks` mit redigierter Ausgabe, falls es bereits verfügbar ist; andernfalls führe sichere Mustersuchen durch und melde die nicht geprüfte Historie ausdrücklich.
    - Prüfe insbesondere `.npmrc`, Deployment-Manifeste, Docker-Konfiguration, Source Maps, Package-Inhalte und Ignore-Regeln. Secret-Templates dürfen nur Platzhalter enthalten.
    - Prüfe Lockfile-Konsistenz und Integritätsfelder, gepinnten Package Manager, Node-Engine, pnpm-Kataloge, neue oder unerwartete Dependencies und auffällige Registry-Quellen.
    - Prüfe alle Lifecycle-Skripte (`preinstall`, `install`, `postinstall`, `prepare`, `prepack`, `prepublishOnly`) und `allowBuilds`. Jede unnötige Ausführung fremden Codes während Install, Build oder Publish ist ein Blocker.
    - Führe `pnpm audit --prod` aus. Ordne Findings nach Erreichbarkeit und Schweregrad ein; verschweige Fehler durch fehlenden Netzwerkzugriff nicht.
    - Prüfe GitHub Actions auf minimale `permissions`, unveränderlich gepinnte Drittanbieter-Actions, sichere Secret-Nutzung, gefährliche `pull_request_target`-Nutzung und Injection über untrusted Context-Werte.
    - Prüfe Build- und Release-Skripte auf Shell-Injection, ungeprüfte Downloads, `curl | sh`, dynamische Codeausführung und Veröffentlichung anderer Dateien als der zuvor geprüften Tarballs.
    - Prüfe Dockerfiles auf nicht gepinnte oder unnötig privilegierte Images, Root-Ausführung im finalen Image und unbeabsichtigt kopierte Repository-Inhalte.
    - Prüfe, ob npm 2FA beziehungsweise Trusted Publishing und Provenance vorgesehen sind. Da Kontoeinstellungen lokal nicht verifizierbar sind, führe fehlende Nachweise als offenen Release-Schritt auf.
    - Behandle exponierte Secrets, veröffentlichbare Credentials, manipulierte Lockfiles, unerwartete Lifecycle-Skripte und nicht reproduzierbare Artefakte als Release-Blocker.

7. **Dokumentation und Infrastruktur**
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
