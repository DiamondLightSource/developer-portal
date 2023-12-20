# Register a Component

## Preface

This how-to will take you through the steps of registering a [Component](../explanations/component.md) with the developer portal using one of the Git [discovery locations](../references/discovery-locations.md).

{%
  include-markdown "../common/get-repository.md"
  heading-offset=1
%}

{%
  include-markdown "../common/create-entity-descriptor.md"
  heading-offset=1
%}

### Entity Definition

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the `kind` as `Component`.

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Component
    ```

{%
  include-markdown "../common/create-entity-metadata.md"
  heading-offset=2
%}

!!! example

    ```yaml
    metadata:
      name: developer-portal-backend
      title: Developer Portal Backend
      description: A node application performing discovery and providing the developer portal REST API.
    ```

### Component Spec

Finally, we will fill out the `spec`. Only the `type` field is required with numerous other optional fields available. It is recommended that you enter a `lifecycle` and an `owner`. Complete field descriptions are available in the [Component spec reference](../references/component-spec.md).

!!! example

    ```yaml
    spec:
      type: service
      lifecycle: experimental
      owner: user:enu43627
    ```

!!! example "Example Complete Descriptor"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
        name: developer-portal-backend
        title: Developer Portal Backend
        description: A node application performing discovery and providing the developer portal REST API.
    spec:
        type: website
        lifecycle: experimental
        system: developer-portal
        owner: user:enu43627
        dependsOn:
            - component:developer-guide
        providesApis:
            - developer-portal-backend-rest
    ```

{%
  include-markdown "../common/push-and-wait.md"
  heading-offset=1
%}
