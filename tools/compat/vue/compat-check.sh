#!/usr/bin/env bash

set -Eeuo pipefail

if [[ -z "${VUE_VERSION:-}" ]]; then
    printf 'Error: VUE_VERSION environment variable is required.\n' >&2
    exit 1
fi

readonly consumer_app_root="/tmp/vue-app"
readonly compat_dir="/tmp/compat-dir"
readonly prebuilt_pack_dir="/tmp/packs"
readonly template_dir="$compat_dir/template"
readonly run_e2e="${RUN_E2E:-false}"
readonly vite_version="${VITE_VERSION:-latest}"
readonly vue_major="${VUE_VERSION%%.*}"
readonly project_name="vue${vue_major}-consumer"
readonly consumer_dir="$consumer_app_root/$project_name"

status_result="FAIL"

finish() {
    printf 'VUE_%s: %s\n' "$vue_major" "$status_result"
}

log_step() {
    printf '\n==> %s\n' "$1"
}

trap finish EXIT

mkdir -p "$consumer_app_root"
cd "$consumer_app_root"

log_step "Using prebuilt component tarballs from image cache"

log_step "Scaffolding fresh Vue ${VUE_VERSION} consumer with Vite ${vite_version}"
npm create "vite@${vite_version}" "$project_name" -- --template vue-ts

cd "$project_name"

log_step "Installing scaffold dependencies"
npm install --no-audit --no-fund

log_step "Pinning Vue ${VUE_VERSION} runtime"
npm install --no-audit --no-fund "vue@$VUE_VERSION"

log_step "Installing packed component packages"
npm install --no-audit --no-fund \
    "$(compgen -G "$prebuilt_pack_dir/parlamentsdienste-pdcomponents-core-*.tgz" | head -n 1)" \
    "$(compgen -G "$prebuilt_pack_dir/parlamentsdienste-pdcomponents-vue-*.tgz" | head -n 1)"

log_step "Injecting Vue compatibility fixture"
rm -rf src public
cp -R "$template_dir/src" ./src
mkdir -p public
cp -R node_modules/@parlamentsdienste/pdcomponents-core/dist/parlamentsdienstecore/assets ./public/assets

log_step "Building Vue ${VUE_VERSION} consumer"
npm run build

if [[ "$run_e2e" == "true" ]]; then
    log_step "Running Playwright end-to-end tests"
    cd "$compat_dir"
    COMPAT_CONSUMER_DIR="$consumer_dir" npx playwright test
fi

status_result="PASS"