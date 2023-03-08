FROM docker.io/library/node:18-bullseye-slim AS build

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        python3-pip

COPY docs-requirements.txt /tmp/docs-requirements.txt

RUN pip install -r /tmp/docs-requirements.txt

COPY package.json yarn.lock  ./
COPY packages/app/package.json packages/app/package.json
COPY packages/backend/package.json packages/backend/package.json

RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked \
    yarn install --frozen-lockfile

COPY ./ ./

RUN yarn run tsc

RUN yarn run build:all

RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar xzf packages/backend/dist/skeleton.tar.gz -C packages/backend/dist/skeleton \
    && tar xzf packages/backend/dist/bundle.tar.gz -C packages/backend/dist/bundle

FROM docker.io/library/nginx:1.23.3-alpine-slim as frontend

WORKDIR /app

RUN apk add --no-cache \
        jq

COPY --from=build /app/packages/app/dist /usr/share/nginx/html
COPY --chmod=700 container_utils/inject-config.sh /docker-entrypoint.d/40-inject-config.sh
COPY container_utils/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

FROM docker.io/library/node:18-bullseye-slim as backend

WORKDIR /app

COPY docs-requirements.txt /tmp/docs-requirements.txt

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        python3-pip \
    && pip install -r /tmp/docs-requirements.txt \
    && rm -rf /var/lib/apt/lists/* \
    && rm /tmp/docs-requirements.txt

COPY --from=build /app/package.json /app/yarn.lock /app/packages/backend/dist/skeleton ./

RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked \
    yarn install --frozen-lockfile --production

COPY --from=build /app/packages/backend/dist/bundle ./

COPY app-config.yaml ./

ENV NODE_ENV production

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml"]
