# Compatibility Tester

Testet die Kompatibilität der parlamentsdienste-components mit verschiedenen Framework-Versionen.

## Struktur

- **angular/** – Testet Angular-Versionen
- **react/** – Testet React-Versionen
- **vue/** – Testet Vue-Versionen

## Verwendung

### Angular

```bash
cd tools/compat/angular
./run.sh [Optionen] <angular-version>
```

**Optionen:**

- `--legacy-peer-deps` – npm-Flag für Legacy-Abhängigkeiten
- `--node-version <version>` – Node.js-Version (default: 24.18.0)
- `--e2e` – E2E-Tests mit Playwright durchführen

**Beispiel:**

```bash
./run.sh --e2e angular-20
```

### React & Vue

```bash
cd tools/compat/react  # oder vue
./run.sh [Optionen] <version>
```

Für React und Vue zusätzlich:

- `--create-vite-version <version>` – create-vite-Version (default: 9.2.0)

Die Defaults sind für reproduzierbare Baseline-Tests fest gepinnt. Für einen bewussten Test gegen den neuesten Scaffolder kann `--create-vite-version latest` verwendet werden.

## Technologie

- **Docker:** Isolierte Build-Umgebungen pro Version
- **Playwright:** E2E-Tests
- **pnpm:** Paketmanagement

## Workflow

1. Docker-Image bauen (mit spezifischer Node-Version)
2. Konsumer-App in Container erstellen
3. Komponenten-Paket installieren
4. Build & ggf. E2E-Tests durchführen
5. Kompatibilität als PASS/FAIL gemeldet

## Ausgabe

Am Ende jedes Tests wird der Status angezeigt:

```
ANGULAR_20: PASS
```
