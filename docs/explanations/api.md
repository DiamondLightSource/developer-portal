# APIs

## Summary

An API describes an interface that can be exposed by a component. The API can be defined in different formats, like [OpenAPI](https://swagger.io/specification/), [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest/), [GraphQL](https://graphql.org/learn/schema/), [gRPC](https://developers.google.com/protocol-buffers), or other formats. See [common api types](../references/common-api-types.md) for an exhaustive list of supported formats.

## Definition

!!! info "Backstage Docs"

    See [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-api) for a full description of the `API` entity definition.

As with all other entities, an API consists of the envelope types, `apiVersion` and `kind`, as well as generic `metadata` and a specific `spec`.

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-api-version-->"
    end="<!--end-api-version-->"
    heading-offset=1
%}

### `kind` [Required]

The `kind` is the high level entity type being described. For an API this must be `API`, e.g. `kind: API`.

Other available `kind`s are enumerated in the [entity types reference](../references/entity-types.md).

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-metadata-->"
    end="<!--end-metadata-->"
    heading-offset=2
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
    include-markdown "../references/api-spec.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}
