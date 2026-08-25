---
name: Security und Supply Chain prüfen
description: Prüft Repository, Abhängigkeiten, Workflows, Container und Publish-Konfiguration lokal auf Security- und Supply-Chain-Risiken
agent: agent
---

# Security und Supply Chain prüfen

Prüfe dieses Repository lokal auf Security- und Supply-Chain-Risiken. Arbeite selbstständig und lies zuerst die Repository-Anweisungen sowie die aktuellen Install-, Build-, Pack-, Release- und Publish-Konfigurationen.

## Sicherheitsgrenzen

- Führe niemals einen echten Publish, Commit, Tag oder Push aus.
- Stage keine Dateien.
- Führe keine Compat-, Core- oder Wrapper-E2E-Tests aus.
- Prüfe keine Remote-Branches und keine GitHub-CI-Ergebnisse.
- Gib gefundene Secrets oder verdächtige Werte niemals aus. Nenne nur Dateipfad, Zeile und Geheimnistyp in redigierter Form.
- Vorhandene lokale Änderungen sind erlaubt und dürfen nicht verworfen oder überschrieben werden.
- Erfasse vor ausführbaren Prüfungen den Git-Ausgangszustand. Melde nur zusätzliche, unerwartete Änderungen als Problem.
- Kleine, eindeutig sichere Fehler darfst du beheben. Validiere sie anschließend erneut.

## Prüfablauf

1. Suche in getrackten Dateien, der lokal vorhandenen Git-Historie und allen vorhandenen Tarballs nach Secrets: Tokens, Zugangsdaten, private Schlüssel, `.env`-Inhalte, Registry-Credentials und eingebettete Authentifizierung in URLs. Verwende `gitleaks` mit redigierter Ausgabe, falls es bereits verfügbar ist; andernfalls führe sichere Mustersuchen durch und melde Einschränkungen ausdrücklich.
2. Prüfe insbesondere `.npmrc`, Deployment-Manifeste, Docker-Konfiguration, Source Maps, Package-Inhalte und Ignore-Regeln. Von `ng-packagr` standardmäßig erzeugte Angular-Source-Maps mit eingebetteten Quellen sind akzeptiert und nicht als Befund zu melden, sofern sie keine Secrets, absoluten lokalen Pfade oder nicht öffentliche Quellen enthalten. Secret-Templates dürfen nur Platzhalter enthalten.
3. Prüfe Lockfile-Konsistenz und Integritätsfelder, gepinnten Package Manager, Node-Engine, pnpm-Kataloge, `overrides`, neue oder unerwartete Dependencies und auffällige Registry-Quellen.
4. Prüfe alle Lifecycle-Skripte (`preinstall`, `install`, `postinstall`, `prepare`, `prepack`, `prepublishOnly`) und `allowBuilds`. Jede unnötige Ausführung fremden Codes während Installation, Build oder Publish ist ein Blocker.
5. Führe `pnpm audit --prod` aus. Ordne Findings nach Erreichbarkeit und Schweregrad ein; verschweige Fehler durch fehlenden Netzwerkzugriff nicht.
6. Prüfe GitHub Actions auf minimale `permissions`, unveränderlich gepinnte Drittanbieter-Actions, sichere Secret-Nutzung, gefährliche `pull_request_target`-Nutzung und Injection über nicht vertrauenswürdige Context-Werte. Bewegliche Major-Tags etablierter Herausgeber wie `actions/*` und `docker/*` sind als akzeptierte Warnung und nicht als Blocker einzustufen, sofern minimale Berechtigungen, sichere Trigger und keine unsichere Verarbeitung nicht vertrauenswürdiger Context-Werte vorliegen.
7. Prüfe Build- und Release-Skripte auf Shell-Injection, ungeprüfte Downloads, `curl | sh`, dynamische Codeausführung und Veröffentlichung ungeprüfter Dateien.
8. Prüfe Dockerfiles auf nicht gepinnte oder unnötig privilegierte Images, Root-Ausführung im finalen Image und unbeabsichtigt kopierte Repository-Inhalte. Die Compat-Images unter `tools/compat` werden ausschließlich lokal als kurzlebige Testumgebungen ausgeführt; fehlendes Digest-Pinning und Root-Ausführung sind dort als akzeptierte Warnungen und nicht als Blocker einzustufen, sofern keine sensiblen Verzeichnisse oder Docker-Sockets eingebunden werden. Für veröffentlichte oder in CI betriebene Images gelten diese Ausnahmen nicht.
9. Prüfe, ob npm 2FA beziehungsweise Trusted Publishing und Provenance vorgesehen sind. Da Kontoeinstellungen lokal nicht verifizierbar sind, führe fehlende Nachweise als offenen Release-Schritt auf.
10. Behandle exponierte Secrets, veröffentlichbare Credentials, manipulierte Lockfiles, unerwartete Lifecycle-Skripte und nicht reproduzierbare Artefakte als Blocker.

## Ergebnis

Gib kein binäres Urteil aus. Berichte kompakt und in dieser Reihenfolge:

1. **Blocker**
2. **Warnungen**
3. **Erfolgreich geprüft**
4. **Bewusst nicht geprüft**
5. **Durchgeführte Fixes**
6. **Nächste Schritte**

Belege Befunde mit klickbaren Dateipfaden und den entscheidenden Befehlsausgaben. Unterscheide klar zwischen Blockern, Hinweisen und bewusst ausgeschlossenen Prüfungen.
