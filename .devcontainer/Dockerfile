FROM docker.io/library/node:23-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN yarn global add \
    markdownlint-cli2 markdown-it-admon

COPY docs/requirements.txt docs/requirements.txt

RUN pip install --break-system-packages -r docs/requirements.txt

COPY backstage/package.json backstage/yarn.lock backstage/
COPY backstage/packages/app/package.json backstage/packages/app/package.json
COPY backstage/packages/backend/package.json backstage/packages/backend/package.json
COPY backstage/plugins/viewdocs-react/package.json backstage/plugins/viewdocs-react/package.json 

RUN yarn install --frozen-lockfile --cwd backstage
RUN pip install --break-system-packages copier
