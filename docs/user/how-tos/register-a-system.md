# Register a System

## Preface

This how-to will take you through the steps of registering a `System` with the developer portal.

As detailed in the [entity ingress explanation](../explanations/entity-ingress.md), the developer portal is configured to automatically pick up entity descriptors present in the [discovery locations](../references/discovery-locations.md). At present, the entity descriptor for this must reside within version control in one of the [discovery locations](../references/discovery-locations.md) which may make choosing a location for your `System` entity descriptor difficult for poly-repo systems, please get in touch if this doesn't suit your needs.

A standalone `System` does not add significant value, therefore it is expected that other entities (e.g. `Component`s or `API`s) will be attached to it via their `spec.system` field.

## Create an Entity Descriptor

!!! info "Entity Descriptor Format"

    For a exhaustive description of the entity descriptor format, see [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format).

Firstly, we must create the entity descriptor file, `catalog-info.yaml`, at the root of the repository.

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the kind as `System`. E.g.:

```yaml
apiVersion: backstage.io/v1alpha1
kind: System
```

### Metadata

Next, we will fill out the `metadata`, this is common to all entity types. The metadata must include a `name` and may optionally include several others, we will choose to give it a `title` and a `description`. The `name` must consist of sequences of `[a-z0-9A-Z]` possibly separated by one of `[-_.]`, whilst the `title` should be short human readable name and the `description` a longer human readable description of the `System`. E.g.:

```yaml
metadata:
  name: developer-portal
  title: Developer Portal
  description: The diamond developer portal.
```

### System Spec

Finally, we will fill out the `System` `spec`. There are no required fields here, however we will choose to give it an `owner`. The `owner` should reference either a `group` or a `user` already available on the catalog the with the syntax of `group:<groupName>` or `user:<fedId>` respectively. E.g.:

```yaml
spec:
  owner: user:enu43627
```

??? note "Completed Descriptor Example"

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

## Push & Wait

Now we have created our entity decriptor in the form of a `catalog-info.yaml` we can push it to one of the [discovery locations](../references/discovery-locations.md) and wait for the developer portal to discover it - be aware that this may take a while depending on the schedule of the discovery provider.
