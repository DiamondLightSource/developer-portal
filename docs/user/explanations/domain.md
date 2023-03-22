# Domains

## Summary

A Domain groups a collection of systems that share terminology, domain models, business purpose, or documentation, i.e. form a bounded context.

## Definition

!!! info "Backstage Docs"

    See [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-domain) for a full description of the `Domain` entity definition.

As with all other entities, a system consists of the envelope types, `apiVersion` and `kind`, as well as generic `metadata` and a specific `spec`.

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-api-version-->"
    end="<!--end-api-version-->"
    heading-offset=1
%}

### `kind` [Required]

The `kind` is the high level entity type being described. For a software domain this must be `Domain`, e.g. `kind: Domain`.

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
    include-markdown "../references/domain-spec.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}
