ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-bookworm-slim AS base

ENV CI=true \
    NG_CLI_ANALYTICS=false \
    npm_config_audit=false \
    npm_config_fund=false

WORKDIR /workspace

RUN apt-get update \
    && apt-get install --yes --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9 --activate

FROM base AS pack-builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json eslint.config.mjs vitest.workspace.ts ./
COPY libs/angular-output-target ./libs/angular-output-target
COPY packages/core ./packages/core
COPY packages/angular ./packages/angular

# Unterdrueckt den noisigen Prebuild-Probe von msgpackr-extract und baut das native Modul gezielt aus dem Quellcode nach.
RUN MSGPACKR_EXTRACT=1 pnpm install --frozen-lockfile
RUN npm_config_build_from_source=true pnpm rebuild msgpackr-extract

RUN pnpm run build:angular-output-target \
    && pnpm run build:core \
    && pnpm run build:angular
    
RUN mkdir -p /opt/pd-angular-compat/packs \
    && core_pack_name="$(cd packages/core && npm pack)" \
    && mv "packages/core/$core_pack_name" "/opt/pd-angular-compat/packs/$core_pack_name" \
    && angular_pack_name="$(cd packages/angular/dist && npm pack)" \
    && mv "packages/angular/dist/$angular_pack_name" "/opt/pd-angular-compat/packs/$angular_pack_name"

FROM base AS runtime

COPY --from=pack-builder /opt/pd-angular-compat/packs /opt/pd-angular-compat/packs
COPY tools/compat/angular /opt/pd-angular-compat/tools/compat/angular

RUN chmod +x /opt/pd-angular-compat/tools/compat/angular/compat-check.sh

CMD ["/opt/pd-angular-compat/tools/compat/angular/compat-check.sh"]