# Register a Resource

## Preface

This how-to will take you through the steps of registering a [Resource](../explanations/resource.md) with the developer portal using one of the Git [discovery locations](../references/discovery-locations.md).

{%
  include-markdown "../common/get-repository.md"
  heading-offset=1
%}

{%
  include-markdown "../common/create-entity-descriptor.md"
  heading-offset=1
%}

### Entity Definition

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the `kind` as `Resource`.

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Resource
    ```

{%
  include-markdown "../common/create-entity-metadata.md"
  heading-offset=2
%}

!!! example

    ```yaml
    metadata:
        name: developer-portal-make-believe-database
        title: Developer Portal Make Believe Database
        description: A database that I just made up to use as an example, it probably contains things.
    ```

### Resource Spec

Finally, we will fill out the `spec`. The `type` and `owner` fields are required with numerous other optional fields available. Complete field descriptions are available in the [Resource spec reference](../references/resource-spec.md).

!!! example

    ```yaml
    spec:
      type: database
      owner: user:enu43627
    ```

!!! example "Example Complete Descriptor"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Resource
    metadata:
        name: developer-portal-make-believe-database
        title: Developer Portal Make Believe Database
        description: A database that I just made up to use as an example, it probably contains things.
    spec:
        type: database
        system: developer-portal
        owner: user:enu43627
    ```

{%
  include-markdown "../common/push-and-wait.md"
  heading-offset=1
%}
