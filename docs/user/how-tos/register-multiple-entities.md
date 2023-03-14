# Register Mutliple Entities

## Preface

This how-to will take you through the steps of registering multiple entities in the catalogue from a single repository. It is assumed that these entities already exist and are commited to version control in one of the [discovery locations](../references/discovery-locations.md).

As detailed in the [entity ingress explanation](../explanations/entity-ingress.md), the developer portal is configured to automatically pick up entity descriptors present in the [discovery locations](../references/discovery-locations.md). Unfortunately this discovery is limited to a single entity per repository, which must be located at it's search location. In order to register multiple entities we will create a `Location` entity which in turn will link to the other entities we wish to register.

## Create Entity Descriptors

We will begin by creating a number of entity descriptor files, as explained in [Register a Component](register-a-component.md) or [Register a Static API](register-a-static-api.md), these files should be given names and located in directories appropriate to the entity they register. E.g. the `my-component` `Component` entity descriptor may be located at `my-component/catalog-info.yaml` or `catalog-info/my-component.yaml`.

## Create a Location Entity

!!! info "Entity Descriptor Format"

    For a exhaustive description of the entity descriptor format, see [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format).

To link together these entitiy descriptors we will use a `Location` entity descriptor, these are used to point the discovery process to other entity descriptors, typically by `URL`.

Firstly, we must create the entity descriptor file, catalog-info.yaml, at the root of the repository.

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the `kind` as `Location`. E.g.:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Location
```

### Metadata

Next, we will fill out the `metadata`, this is common to all entity types. The metadata must include a `name` and may optionally include several others, we will choose to give it a `title` and a `description`. The `name` must consist of sequences of `[a-z0-9A-Z]` possibly separated by one of `[-_.]`, whilst the `title` should be short human readable name and the `description` a longer human readable description of the `API`. E.g.:

```yaml
metadata:
  name: developer-portal
  title: Developer Portal
  description: The diamond developer portal.
```

### Location Spec

Finally, we will fill out the `Location` `spec`. For this a `type` and `targets` are required but again we may optionally include several others. The `type` field must be either `url` or `file`, however as `file` refers to a local file only `url` is useful; The `targets` entry should consist a list of `url`s directing the discovery task to other entity descriptors. E.g.:

```yaml
spec:
  type: url
  targets:
    - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/system.yaml
    - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/frontend.yaml
    - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/backend.yaml
    - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/backend-rest.yaml
```

??? note "Completed Descriptor Example"

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Location
    metadata:
        name: developer-portal
        description: A RESTful API exposed by the developer portal backend.
    spec:
        type: url
        targets:
            - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/system.yaml
            - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/frontend.yaml
            - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/backend.yaml
            - https://github.com/DiamondLightSource/developer-portal/blob/main/catalog-info/backend-rest.yaml
    ```

## Push & Wait

Now we have created our entity decriptor in the form of a `catalog-info.yaml` we can push it to one of the [discovery locations](../references/discovery-locations.md) and wait for the developer portal to discover it - be aware that this may take a while depending on the schedule of the discovery provider.
