# Register a Static API

## Preface

This how-to will take you through the steps of registering an [API](../explanations/component.md) with the developer portal using one of the Git [discovery locations](../references/discovery-locations.md).

{%
  include-markdown "../common/get-repository.md"
  heading-offset=1
%}

{%
  include-markdown "../common/create-entity-descriptor.md"
  heading-offset=1
%}

### Entity Definition

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the `kind` as `API`.

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: API
    ```

{%
  include-markdown "../common/create-entity-metadata.md"
  heading-offset=2
%}

!!! example

    ```yaml
    metadata:
      name: developer-portal-backend-rest
      title: Developer Portal Backend REST API
      description: A RESTful API exposed by the developer portal backend.
    ```

### API Spec

Finally, we will fill out the `API` `spec`. A `type`, a `lifecycle`, an `owner` and a `definition` with the `system` field remaining optional. Complete field descriptions are available in the [API spec reference](../references/api-spec.md).

!!! example

    ```yaml
    spec:
      type: service
      lifecycle: experimental
      owner: user:enu43627
      definition: |
        openapi: 3.0.0
          info:
            title: Backstage API
            version: 0.0.1
    ```

!!! tip "Schema Generation"

    It may often be more convenient to link to a generated schema, this can be achieved with use of the `$text` substituion which points to the URL of a schema definiton. For example, a url of the form `https://github.com/DiamondLightSource/<your_repo>/releases/latest/download/<your_schema_file>` can be used to load the contents of the `<your_schema>` artifact from the latest GitHub release.

??? example "Example Completed Descriptor"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: API
    metadata:
      name: developer-portal-backend-rest
      description: A RESTful API exposed by the developer portal backend.
    spec:
      type: openapi
      lifecycle: experimental
      owner: user:enu43627
      system: developer-portal
      definition: |
        openapi: 3.0.0
        info:
          title: Backstage API
          version: 0.0.1
    ```

{%
  include-markdown "../common/push-and-wait.md"
  heading-offset=1
%}
