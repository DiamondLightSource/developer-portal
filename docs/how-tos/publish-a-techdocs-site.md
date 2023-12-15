# Publish a Techdocs Site

## Preface

This how-to will take you through the steps of building and publishing a techdocs site for inclusion in the developer portal catalog. In order to do this we must build the site and push it to a S3 compatible object store.

## Setup & Configure Mkdocs

To begin, follow the [getting started guide](https://www.mkdocs.org/getting-started/#getting-started-with-mkdocs) for Mkdocs. You should include `techdocs-core` in `plugins` list and subsequently `mkdocs-techdocs-core` in your python requirements definition.

!!! warning

    Beware, `techdocs-core` overrides various mkdocs configuration options including `theme`.

!!! example

    ```yaml
    site_name: Developer Portal
    site_url: https://0.0.0.0/
    repo_url: https://github.com/DiamondLightSource/developer-portal
    edit_uri: edit/main/docs/
    plugins:
      - techdocs-core
    ```

## Build Docs

We will use the Techdocs command line interface node package to build our docs site locally. To do this we will run:

```bash
npx @techdocs/cli generate --no-docker
```

At this point you should see a `site` directory, the contents of which can be viewed in your browser.

## Publish Docs

We will use the Techdocs command line interface node package to publish our docs site to the S3 bucket.

In order to do this we will require the nessacary credentials for the bucket. The nessacary credentials should be made available as the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. These credentials are made available in GitHub Workflows in the DiamondLightSource organisation as `TECHDOCS_S3_ACCESS_KEY_ID` and `TECHDOCS_S3_SECRET_ACCESS_KEY` respectively or can be attained by contacting the owner of `developer-portal-techdocs-bucket`. Further to this, the `AWS_REGION` environment variable should be set to an empty string.

We will now run:

```bash
npx @techdocs/cli publish --entity <NAMESPACE/KIND/NAME> --publisher-type awsS3 --storage-name techdocs --awsEndpoint https://s3.echo.stfc.ac.uk --awsS3ForcePathStyle
```

??? example "Example GitHub Workflow"

    ```yaml
    name: Docs CI

    on:
      push:
        - main

    jobs:
      publish_techdocs:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
          uses: actions/checkout@v3
          with:
          fetch-depth: 0

        - name: Setup python
          uses: actions/setup-python@v4
          with:
          python-version: 3.11

        - name: Install docs dependencies
          run: pip install -r docs-requirements.txt

        - name: Set node
          uses: actions/setup-node@v3
          with:
          node-version: 18.x

        - name: Generate docs
          run: npx @techdocs/cli generate --no-docker

        - name: Publish docs to s3 bucket
          run: >
            npx @techdocs/cli publish
            --entity default/component/developer-portal-backend
            --publisher-type awsS3
            --storage-name techdocs
            --awsEndpoint https://s3.echo.stfc.ac.uk
            --awsS3ForcePathStyle
          env:
            AWS_ACCESS_KEY_ID: ${{ secrets.TECHDOCS_S3_ACCESS_KEY_ID }}
            AWS_SECRET_ACCESS_KEY: ${{ secrets.TECHDOCS_S3_SECRET_ACCESS_KEY }}
            AWS_REGION: ""
    ```

??? example "Example GitLab Workflow"

    ```yaml
    image: node:18-bullseye

    variables:
      GIT_SUBMODULE_STRATEGY: recursive

    stages:
      - publish_techdocs

    before_script:
      - apt-get update
      - apt-get install -y --no-install-recommends python3-pip
      - pip install -r requirements.txt

    publish_techdocs:
      stage: publish_techdocs
      rules:
        - if: $CI_COMMIT_REF_NAME == "main"
      tags:
        - argus
      script:
        - npx @techdocs/cli generate --no-docker
        - >
          npx @techdocs/cli publish
          --entity default/component/developer-guide
          --publisher-type awsS3
          --storage-name techdocs
          --awsEndpoint https://s3.echo.stfc.ac.uk
          --awsS3ForcePathStyle
      variables:
        AWS_REGION: ""
    ```

## Annotate Entity

Finally, we will add the `backstage.io/techdocs-ref` annotation to the `metadata.annotations` field of the entity descriptor. This should point to the root directory of the documentation (i.e. the directory containing the `mkdocs.yaml` file).

??? example "Example Entity Descriptor"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
      name: developer-guide
      annotations:
        backstage.io/techdocs-ref: dir:.
    spec:
      type: website
      lifecycle: experimental
      owner: user:enu43627
    ```
