#!/usr/bin/env bash

set -Eeuo pipefail

readonly script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly repo_root="$(cd -- "$script_dir/../../.." && pwd)"

image_tag="${IMAGE_TAG:-pd-angular-compat:local}"
node_version="24"
legacy_peer_deps="false"
run_e2e="false"
angular_version=""

usage() {
    printf 'Usage: %s [--legacy-peer-deps] [--node-version <version>] [--e2e] <angular-version>\n' "$0" >&2
}

fail() {
    printf 'Error: %s\n' "$1" >&2
    usage
    exit 1
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --legacy-peer-deps)
            legacy_peer_deps="true"
            ;;
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
        --*)
            fail "Unknown option $1"
            ;;
        *)
            angular_version="$1"
            ;;
    esac
    shift
done

[[ -n "$angular_version" ]] || fail 'Angular version is required.'

printf '\n**********************************************************\n'
printf '*  Starting compatibility evaluation with:\n'
printf '*  Angular version  : %s\n' "$angular_version"         
printf '*  Node version     : %s\n' "$node_version"
printf '*  Legacy peer deps : %s\n' "$legacy_peer_deps"
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

printf 'Running image %s for Angular %s\n' "$image_tag" "$angular_version"
docker run --rm \
    --env "ANGULAR_VERSION=$angular_version" \
    --env "LEGACY_PEER_DEPS=$legacy_peer_deps" \
    --env "RUN_E2E=$run_e2e" \
    "$image_tag"