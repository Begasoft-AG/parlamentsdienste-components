#!/usr/bin/env bash

set -Eeuo pipefail

if [[ -z "${ANGULAR_VERSION:-}" ]]; then
    printf 'Error: ANGULAR_VERSION environment variable is required.\n' >&2
    exit 1
fi

readonly consumer_app_root="/tmp/angular-app"
readonly compat_dir="/tmp/compat-dir"
readonly prebuilt_pack_dir="/tmp/packs"
if [[ "$ANGULAR_VERSION" == angular-* ]]; then
    readonly angular_major="${ANGULAR_VERSION#angular-}"
    readonly angular_cli_version="$angular_major"
else
    readonly angular_major="${ANGULAR_VERSION%%.*}"
    readonly angular_cli_version="$ANGULAR_VERSION"
fi
readonly template_dir="$compat_dir/angular-$angular_major"
readonly legacy_peer_deps="${LEGACY_PEER_DEPS:-false}"
readonly run_e2e="${RUN_E2E:-false}"
readonly project_name="angular${angular_major}-consumer"
readonly consumer_dir="$consumer_app_root/$project_name"

status="FAIL"

finish() {
    printf 'ANGULAR_%s: %s\n' "$angular_major" "$status"
}

log_step() {
    printf '\n==> %s\n' "$1"
}

trap finish EXIT

mkdir -p "$consumer_app_root"

log_step "Using prebuilt component tarballs from image cache"
cd "$consumer_app_root"

log_step "Scaffolding fresh Angular ${angular_cli_version} consumer"
npx -y "@angular/cli@$angular_cli_version" new "$project_name" \
    --defaults \
    --minimal \
    --package-manager npm \
    --routing false \
    --skip-git \
    --skip-tests \
    --standalone \
    --style scss

cd "$project_name"

log_step "Installing packed component packages"
install_args=(--no-audit --no-fund)
if [[ "$legacy_peer_deps" == "true" ]]; then
    install_args+=(--legacy-peer-deps)
fi

npm install "${install_args[@]}" \
    "$(compgen -G "$prebuilt_pack_dir/parlamentsdienste-pdcomponents-core-*.tgz" | head -n 1)" \
    "$(compgen -G "$prebuilt_pack_dir/parlamentsdienste-pdcomponents-angular-*.tgz" | head -n 1)"

log_step "Injecting Angular ${angular_major} compatibility fixture"
cp "$template_dir/angular.json" angular.json
rm -rf src
cp -R "$template_dir/src" ./src

log_step "Building Angular ${angular_cli_version} consumer"
npm run build

if [[ "$run_e2e" == "true" ]]; then
    log_step "Running Playwright end-to-end tests"
    cd "$compat_dir"
    COMPAT_CONSUMER_DIR="$consumer_dir" npx playwright test
fi

status="PASS"