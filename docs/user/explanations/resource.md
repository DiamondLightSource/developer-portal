# Resources

## Summary

A resource describes the infrastructure a [System](system.md) needs to operate, like BigTable databases, Pub/Sub topics, S3 buckets or CDNs. Modelling them together with components and systems allows to visualize resource footprint, and create tooling around them.

## Definitions

!!! info "Backstage Docs"

    See [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-resource) for a full description of the `Resource` entity definition.

As with all other entities, a resource consists of the envelope types, `apiVersion` and `kind`, as well as generic `metadata` and a specific `spec`.

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-api-version-->"
    end="<!--end-api-version-->"
    heading-offset=1
%}

### `kind` [Required]

The `kind` is the high level entity type being described. For a resource this must be `Resource`, e.g. `kind: Resource`.

Other available `kind`s are enumerated in the [entity types reference](../references/entity-types.md).

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-metadata-->"
    end="<!--end-metadata-->"
    heading-offset=1
%}

{%
    include-markdown "../references/entity-metadata.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}

### `spec` [Required]

The actual specification data that describes the entity.

{%
    include-markdown "../references/resource-spec.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}
