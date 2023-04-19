FROM node:18-bullseye

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3-pip \
    && rm -rf /var/lib/apt/lists/*

COPY docs/requirements.txt docs/requirements.txt

RUN pip install -r docs/requirements.txt

COPY backstage/package.json backstage/yarn.lock backstage/
COPY backstage/packages/app/package.json backstage/packages/app/package.json
COPY backstage/packages/backend/package.json backstage/packages/backend/package.json
COPY backstage/plugins/viewdocs-react/package.json backstage/plugins/viewdocs-react/package.json 

RUN yarn install --frozen-lockfile --cwd backstage
