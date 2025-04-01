FROM docker.io/library/node:20-bookworm-slim AS build

WORKDIR /app

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update \
    && apt-get install -y --no-install-recommends python3-pip \
        python3 g++ build-essential git \
    && yarn config set python /usr/bin/python3

RUN pip install --break-system-packages copier

COPY package.json yarn.lock ./
COPY packages/app/package.json packages/app/package.json
COPY packages/backend/package.json packages/backend/package.json
COPY plugins/viewdocs-react/package.json plugins/viewdocs-react/package.json

ENV CYPRESS_INSTALL_BINARY=0
RUN --mount=type=cache,target=/root/.cache/yarn,sharing=locked \
    yarn global add node-gyp \
    && yarn install --frozen-lockfile 

COPY ./ ./

RUN yarn run tsc

RUN yarn --cwd packages/app build 
RUN yarn --cwd packages/backend build 

RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar xzf packages/backend/dist/skeleton.tar.gz -C packages/backend/dist/skeleton \
    && tar xzf packages/backend/dist/bundle.tar.gz -C packages/backend/dist/bundle

FROM docker.io/library/nginx:1.27.4-alpine-slim as frontend

WORKDIR /app

RUN apk add --no-cache jq

COPY --from=build /app/packages/app/dist /usr/share/nginx/html
COPY --chmod=700 container_utils/inject-config.sh /docker-entrypoint.d/40-inject-config.sh
COPY container_utils/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

FROM docker.io/library/node:20-bookworm-slim as backend

WORKDIR /app

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 g++ build-essential \
    && yarn config set python /usr/bin/python3

COPY --from=build /app/package.json /app/yarn.lock /app/packages/backend/dist/skeleton ./

RUN --mount=type=cache,target=/root/.cache/yarn,sharing=locked \
    yarn global add node-gyp \
    && yarn install --frozen-lockfile --production

COPY --from=build /app/packages/backend/dist/bundle ./

COPY app-config.yaml ./

ENV NODE_ENV production

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml"]
