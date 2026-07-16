ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-bookworm-slim AS base

ENV CI=true \
    npm_config_audit=false \
    npm_config_fund=false

WORKDIR /workspace

RUN apt-get update \
    && apt-get install --yes --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9 --activate

FROM base AS pack-builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json eslint.config.mjs ./
COPY packages/core ./packages/core
COPY packages/react ./packages/react
COPY libs/angular-output-target ./libs/angular-output-target

RUN MSGPACKR_EXTRACT=1 pnpm install --frozen-lockfile
RUN npm_config_build_from_source=true pnpm rebuild msgpackr-extract

RUN pnpm run build:core \
    && pnpm run build:angular-output-target \
    && pnpm run build:react

RUN mkdir -p /tmp/packs \
    && core_pack_name="$(cd packages/core && npm pack)" \
    && mv "packages/core/$core_pack_name" "/tmp/packs/$core_pack_name" \
    && react_pack_name="$(cd packages/react && npm pack)" \
    && mv "packages/react/$react_pack_name" "/tmp/packs/$react_pack_name"

FROM base AS runtime

COPY --from=pack-builder /tmp/packs /tmp/packs
COPY tools/compat/react /tmp/compat-dir

WORKDIR /tmp/compat-dir

RUN npm install --no-audit --no-fund \
    && npx playwright install --with-deps chromium

RUN chmod +x /tmp/compat-dir/compat-check.sh

CMD ["/tmp/compat-dir/compat-check.sh"]