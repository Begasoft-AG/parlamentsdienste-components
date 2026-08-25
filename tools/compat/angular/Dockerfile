ARG NODE_VERSION=24.18.0

FROM node:${NODE_VERSION}-bookworm-slim AS base

ENV CI=true \
    NG_CLI_ANALYTICS=false \
    npm_config_audit=false \
    npm_config_fund=false \
    npm_config_engine_strict=false

WORKDIR /workspace

RUN apt-get update \
    && apt-get install --yes --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

FROM base AS pack-builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.web.json eslint.config.mjs ./
RUN corepack enable && corepack install && pnpm --version
COPY libs/angular-output-target ./libs/angular-output-target
COPY packages/core ./packages/core
COPY packages/angular ./packages/angular

# Unterdrueckt den noisigen Prebuild-Probe von msgpackr-extract und baut das native Modul gezielt aus dem Quellcode nach.
RUN MSGPACKR_EXTRACT=1 pnpm install --frozen-lockfile
RUN npm_config_build_from_source=true pnpm rebuild msgpackr-extract

RUN pnpm run build:angular-output-target \
    && pnpm run build:core \
    && pnpm run build:angular

RUN pnpm run pack:core \
    && pnpm run pack:angular

FROM base AS runtime

WORKDIR /tmp/compat-dir

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

COPY tools/compat/angular/package.json ./
RUN npm install --no-audit --no-fund \
    && npx playwright install --with-deps chromium

COPY --from=pack-builder /workspace/dist/core /tmp/packs/core
COPY --from=pack-builder /workspace/dist/angular /tmp/packs/angular
COPY tools/compat/angular /tmp/compat-dir

RUN chmod +x /tmp/compat-dir/compat-check.sh \
    && chown -R node:node /tmp/compat-dir /ms-playwright

USER node

CMD ["/tmp/compat-dir/compat-check.sh"]