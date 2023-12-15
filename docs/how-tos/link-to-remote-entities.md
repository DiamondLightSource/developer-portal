# Link to Remote Entities

## Preface

This how-to will take you through the steps of registering multiple entities in the catalogue, where the entitiy descriptors are remotely located.

{%
  include-markdown "../common/get-repository.md"
  heading-offset=1
%}

## Create Referenced Descriptors

It is nessacary to create a number of regular entities (e.g. [Components](../explanations/component.md) or [APIs](../explanations/api.md)) before we can register them together. This may be performed as explained in [Register a Component](register-a-component.md) or [Register a Static API](register-a-static-api.md). Instead of their usual locations, these files should be given names and located in directories appropriate to the entity they register. For example, the entity descriptor for `my-component` may be located at `my-component/catalog-info.yaml`or`catalog-info/my-component.yaml`.

{%
  include-markdown "../common/create-entity-descriptor.md"
  heading-offset=1
%}

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the `kind` as `Location`. E.g.:

### Entity Definition

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Location
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

### Location Spec

Finally, we will fill out the `spec`. Only the `targets` field is required with numerous other optional fields available. Complete field descriptions are available in the [Location spec reference](../references/location-spec.md).

!!! important

    The location `type` is intentionally left blank such that the discovery process is inherited from whichever discovery process indexed this location.

!!! example

    ```yaml
    spec:
    targets:
        - ./catalog-info/system.yaml
        - ./catalog-info/frontend.yaml
        - ./catalog-info/backend.yaml
        - ./catalog-info/backend-rest.yaml
    ```

??? example "Example Completed Descriptor"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Location
    metadata:
        name: developer-portal
        description: A RESTful API exposed by the developer portal backend.
    spec:
        targets:
            - ./catalog-info/system.yaml
            - ./catalog-info/frontend.yaml
            - ./catalog-info/backend.yaml
            - ./catalog-info/backend-rest.yaml
    ```

{%
  include-markdown "../common/push-and-wait.md"
  heading-offset=1
%}
