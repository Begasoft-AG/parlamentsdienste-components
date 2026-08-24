#!/usr/bin/env bash

set -Eeuo pipefail

readonly script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly repo_root="$(cd -- "$script_dir/../../.." && pwd)"

image_tag="${IMAGE_TAG:-pd-react-compat:local}"
node_version="24.18.0"
create_vite_version="9.2.0"
run_e2e="false"
react_version=""

usage() {
    printf 'Usage: %s [--node-version <version>] [--create-vite-version <version>] [--e2e] <react-version>\n' "$0" >&2
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
        --create-vite-version=*)
            [[ -n "${1#*=}" ]] && create_vite_version="${1#*=}"
            ;;
        --create-vite-version)
            if [[ $# -gt 1 && -n "$2" && "$2" != --* ]]; then
                create_vite_version="$2"
                shift
            fi
            ;;
        --*)
            fail "Unknown option $1"
            ;;
        *)
            react_version="$1"
            ;;
    esac
    shift
done

[[ -n "$react_version" ]] || fail 'React version is required.'

printf '\n**********************************************************\n'
printf '*  Starting compatibility evaluation with:\n'
printf '*  React version    : %s\n' "$react_version"
printf '*  create-vite      : %s\n' "$create_vite_version"
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

printf 'Running image %s for React %s\n' "$image_tag" "$react_version"
docker run --rm \
    --env "REACT_VERSION=$react_version" \
    --env "CREATE_VITE_VERSION=$create_vite_version" \
    --env "RUN_E2E=$run_e2e" \
    "$image_tag"