#!/usr/bin/env bash

set -Eeuo pipefail

if [[ -z "${ANGULAR_VERSION:-}" ]]; then
    printf 'Error: ANGULAR_VERSION environment variable is required.\n' >&2
    exit 1
fi

readonly temp_root="/tmp/pd-angular-compat"
readonly angular_major="${ANGULAR_VERSION%%.*}"
readonly prebuilt_pack_dir="/opt/pd-angular-compat/packs"
readonly template_dir="/opt/pd-angular-compat/tools/compat/angular/angular-$angular_major"
readonly legacy_peer_deps="${LEGACY_PEER_DEPS:-false}"

status="FAIL"

finish() {
    printf 'ANGULAR_%s: %s\n' "$angular_major" "$status"
}

log_step() {
    printf '\n==> %s\n' "$1"
}

cleanup() {
    rm -rf "$temp_root"
}

trap finish EXIT

cleanup
mkdir -p "$temp_root/consumer"

log_step "Using prebuilt component tarballs from image cache"
cd "$temp_root/consumer"

log_step "Scaffolding fresh Angular ${ANGULAR_VERSION} consumer"
npx -y "@angular/cli@$ANGULAR_VERSION" new "angular${angular_major}-consumer" \
    --defaults \
    --minimal \
    --package-manager npm \
    --routing false \
    --skip-git \
    --skip-tests \
    --standalone \
    --style css

cd "angular${angular_major}-consumer"

log_step "Installing packed component packages"
install_args=(--no-audit --no-fund)
if [[ "$legacy_peer_deps" == "true" ]]; then
    install_args+=(--legacy-peer-deps)
fi

npm install "${install_args[@]}" \
    "$(compgen -G "$prebuilt_pack_dir/parlamentsdienste-pdcomponents-core-*.tgz" | head -n 1)" \
    "$(compgen -G "$prebuilt_pack_dir/parlamentsdienste-pdcomponents-angular-*.tgz" | head -n 1)"

log_step "Injecting minimal pd-button consumer"
cp "$template_dir/src/main.ts" src/main.ts
cp "$template_dir/src/app/app.component.ts" src/app/app.component.ts

log_step "Building Angular ${ANGULAR_VERSION} consumer"
npm run build

status="PASS"