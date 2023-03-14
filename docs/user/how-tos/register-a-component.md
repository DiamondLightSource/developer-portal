# Register a Component

## Preface

This how-to will take you through the steps of registering a `Component` with the developer portal. It is assumed that this `Component` already exists and is commited to version control in one of the [discovery locations](../references/discovery-locations.md).

As detailed in the [entity ingress explanation](../explanations/entity-ingress.md), the developer portal is configured to automatically pick up entity descriptors present in the [discovery locations](../references/discovery-locations.md). Thus registering a `Component` is as simple as adding an entity descriptor to your repository.

Whilst a minimal entity descriptor will suffice in getting the `Component` on the portal, adding relations is highly encouraged as they massively help facilitate understanding of complex systems.

## Create an Entity Descriptor

!!! info "Entity Descriptor Format"

    For a exhaustive description of the entity descriptor format, see [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format).

Firstly, we must create the entity descriptor file, `catalog-info.yaml`, at the root of the repository.

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the kind as `Component`. E.g.:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
```

### Metadata

Next, we will fill out the `metadata`, this is common to all entity types. The metadata must include a `name` and may optionally include several others, we will choose to give it a `title` and a `description`. The `name` must consist of sequences of `[a-z0-9A-Z]` possibly separated by one of `[-_.]`, whilst the `title` should be short human readable name and the `description` a longer human readable description of the `Component`. E.g.:

```yaml
metadata:
  name: developer-portal-backend
  title: Developer Portal Backend
  description: A node application performing discovery and providing the developer portal REST API.
```

### Component Spec

Finally, we will fill out the `Component` `spec`. For this only the `type` is required but again we may optionally include several others, we will choose to give it a `lifecycle` and an `owner`. Whilst `type` may be any string, it is best to use one of the [common component types](../references/common-component-types.md); similarly `lifecycle` may be any string, it is best to use one of the [common lifecycle stages](../references/common-lifecycle-stages.md); the `owner` should reference either a `group` or a `user` already available on the catalog the with the syntax of `group:<groupName>` or `user:<fedId>` respectively. E.g.:

```yaml
spec:
  type: service
  lifecycle: experimental
  owner: user:enu43627
```

### Relations

To futher aid with the understanding of software systems, it is valuable to record relations between `entities` in the catalog. For a `Component`, this can be done by adding the following records under the `spec`:

- `system` - a reference to the `System` which this `Component` is part of
- `providesApis` - a reference to an `API` which this `Component` provides
- `consumesApis` - a reference to an `API` which this `Component` consumes
- `dependsOn` - a reference to another `Comoponent`, typically of `type: Library`, which this `Component` depends on

E.g.:

```yaml
dependsOn:
  - component:developer-guide
providesApis:
  - developer-portal-backend-rest
```

??? note "Completed Descriptor Example"

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

## Push & Wait

Now we have created our entity decriptor in the form of a `catalog-info.yaml` we can push it to one of the [discovery locations](../references/discovery-locations.md) and wait for the developer portal to discover it - be aware that this may take a while depending on the schedule of the discovery provider.
