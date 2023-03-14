# Register a Static API

## Preface

This how-to will take you through the steps of registering a static `API` with the developer portal. It is assumed that this `API` already exists and a static schema can be commited to version control in one of the [discovery locations](../references/discovery-locations.md).

As detailed in the [entity ingress explanation](../explanations/entity-ingress.md), the developer portal is configured to automatically pick up entity descriptors present in the [discovery locations](../references/discovery-locations.md). Thus registering an `API` is as simple as adding an entity descriptor to your repository.

Whilst a minimal entity descriptor will suffice in getting the `API` on the portal, adding relations is highly encouraged as they massively help facilitate understanding of complex systems.

## Create an Entity Descriptor

!!! info "Entity Descriptor Format"

    For a exhaustive description of the entity descriptor format, see [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format).

Firstly, we must create the entity descriptor file, `catalog-info.yaml`, at the root of the repository.

To begin, we will specify the `apiVersion` to be `backstage.io/v1alpha1` and the kind as `API`. E.g.:

```yaml
apiVersion: backstage.io/v1alpha1
kind: API
```

### Metadata

Next, we will fill out the `metadata`, this is common to all entity types. The metadata must include a `name` and may optionally include several others, we will choose to give it a `title` and a `description`. The `name` must consist of sequences of `[a-z0-9A-Z]` possibly separated by one of `[-_.]`, whilst the `title` should be short human readable name and the `description` a longer human readable description of the `API`. E.g.:

```yaml
metadata:
  name: developer-portal-backend-rest
  title: Developer Portal Backend REST API
  description: A RESTful API exposed by the developer portal backend.
```

### API Spec

Finally, we will fill out the `API` `spec`. For this a `type`, `lifecycle`, `owner` and `definition` are required but again we may optionally include several others. Whilst `type` may be any string, it is best to use one of the [common API types](../references/common-api-types.md); similarly `lifecycle` may be any string, it is best to use one of the [common lifecycle stages](../references/common-lifecycle-stages.md); the `owner` should reference either a `group` or a `user` already available on the catalog the with the syntax of `group:<groupName>` or `user:<fedId>` respectively. The `definiton` is used to describe the `API` itself and should be assigned a multi-line string appropriate for it's `type` (e.g. an `openapi` schema string for an `API` of `type: openapi`). E.g.:

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

!!! info "Schema Generation"

    It is often possible to generate `API` schemas with tools provided by server libraries or frameworks. Here's how to do so for some common `API` server libraries:

    - [FastAPI](https://docs.pydantic.dev/usage/schema/)

??? note "Completed Descriptor Example"

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

## Push & Wait

Now we have created our entity decriptor in the form of a `catalog-info.yaml` we can push it to one of the [discovery locations](../references/discovery-locations.md) and wait for the developer portal to discover it - be aware that this may take a while depending on the schedule of the discovery provider.
