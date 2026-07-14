#!/usr/bin/env bash

set -Eeuo pipefail

readonly script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly repo_root="$(cd -- "$script_dir/../../.." && pwd)"

image_tag="${IMAGE_TAG:-pd-vue-compat:local}"
node_version="24"
vite_version="latest"
run_e2e="false"
vue_version=""

usage() {
    printf 'Usage: %s [--node-version <version>] [--vite-version <version>] [--e2e] <vue-version>\n' "$0" >&2
}

fail() {
    printf 'Error: %s\n' "$1" >&2
    usage
    exit 1
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --e2e)
            run_e2e="true"
            ;;
        --node-version=*)
            [[ -n "${1#*=}" ]] && node_version="${1#*=}"
            ;;
        --node-version)
            if [[ $# -gt 1 && -n "$2" && "$2" != --* ]]; then
                node_version="$2"
                shift
            fi
            ;;
        --vite-version=*)
            [[ -n "${1#*=}" ]] && vite_version="${1#*=}"
            ;;
        --vite-version)
            if [[ $# -gt 1 && -n "$2" && "$2" != --* ]]; then
                vite_version="$2"
                shift
            fi
            ;;
        --*)
            fail "Unknown option $1"
            ;;
        *)
            vue_version="$1"
            ;;
    esac
    shift
done

[[ -n "$vue_version" ]] || fail 'Vue version is required.'

printf '\n**********************************************************\n'
printf '*  Starting compatibility evaluation with:\n'
printf '*  Vue version      : %s\n' "$vue_version"
printf '*  Vite version     : %s\n' "$vite_version"
printf '*  Node version     : %s\n' "$node_version"
printf '*  Run E2E          : %s\n' "$run_e2e"
printf '*  Docker image tag : %s\n' "$image_tag"
printf '**********************************************************\n\n'

printf 'Building image %s\n' "$image_tag"
docker build \
    --build-arg "NODE_VERSION=$node_version" \
    --file "$script_dir/Dockerfile" \
    --progress=plain \
    --tag "$image_tag" \
    "$repo_root"

printf 'Running image %s for Vue %s\n' "$image_tag" "$vue_version"
docker run --rm \
    --env "VUE_VERSION=$vue_version" \
    --env "VITE_VERSION=$vite_version" \
    --env "RUN_E2E=$run_e2e" \
    "$image_tag"