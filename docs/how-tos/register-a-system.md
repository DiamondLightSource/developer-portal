# Register a System

## Preface

This how-to will take you through the steps of registering a [System](../explanations/system.md) with the developer portal using one of the Git [discovery locations](../references/discovery-locations.md).

!!! tip

    A lone System entity does not add significant value, therefore it is expected that other entities (e.g. [Components](../explanations/component.md) or [APIs](../explanations/api.md)) will be attached to it via their `spec.system` field.

{%
  include-markdown "../common/get-repository.md"
  heading-offset=1
%}

{%
  include-markdown "../common/create-entity-descriptor.md"
  heading-offset=1
%}

### Entity Definition

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the `kind` as `System`. E.g.:

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: System
    ```

{%
  include-markdown "../common/create-entity-metadata.md"
  heading-offset=2
%}

!!! example

    ```yaml
    metadata:
      name: developer-portal
      title: Developer Portal
      description: The diamond developer portal.
    ```

### System Spec

Finally, we will fill out the `spec`. There are no required fields here. However it is recommended that you enter an `owner`. Complete field descriptions are available in the [System spec reference](../references/system-spec.md).

!!! example

    ```yaml
    spec:
      owner: user:enu43627
    ```

!!! example "Example Completed Descriptor"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: System
    metadata:
        name: developer-portal
        title: Developer Portal
        description: The diamond developer portal.
    spec:
        owner: user:enu43627
    ```

{%
  include-markdown "../common/push-and-wait.md"
  heading-offset=1
%}
