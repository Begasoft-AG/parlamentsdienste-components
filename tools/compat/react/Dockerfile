ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-bookworm-slim AS base

ENV CI=true \
    npm_config_audit=false \
    npm_config_fund=false \
    npm_config_engine_strict=false

WORKDIR /workspace

RUN apt-get update \
    && apt-get install --yes --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9 --activate

FROM base AS pack-builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.web.json eslint.config.mjs ./
COPY packages/core ./packages/core
COPY packages/react ./packages/react
COPY libs/angular-output-target ./libs/angular-output-target

RUN node -e "const fs=require('fs'),p=JSON.parse(fs.readFileSync('package.json','utf8'));delete p.engines;fs.writeFileSync('package.json',JSON.stringify(p,null,4))"

RUN MSGPACKR_EXTRACT=1 pnpm install --frozen-lockfile
RUN npm_config_build_from_source=true pnpm rebuild msgpackr-extract

RUN pnpm run build:core \
    && pnpm run build:angular-output-target \
    && pnpm run build:react

RUN mkdir -p /tmp/packs \
    && (cd packages/core && pnpm pack --pack-destination /tmp/packs) \
    && (cd packages/react && pnpm pack --pack-destination /tmp/packs)

FROM base AS runtime

COPY --from=pack-builder /tmp/packs /tmp/packs
COPY tools/compat/react /tmp/compat-dir

WORKDIR /tmp/compat-dir

RUN npm install --no-audit --no-fund \
    && npx playwright install --with-deps chromium

RUN chmod +x /tmp/compat-dir/compat-check.sh

CMD ["/tmp/compat-dir/compat-check.sh"]