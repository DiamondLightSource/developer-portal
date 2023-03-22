# Systems

## Summary

A system is a collection of resources and [components](component.md). The system may expose or consume one or several [APIs](api.md). It is viewed as abstraction level that provides potential consumers insights into exposed features without needing a too detailed view into the details of all components. This also gives the owning team the possibility to decide about published artifacts and APIs.

## Definition

!!! info "Backstage Docs"

    See [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-system) for a full description of the `System` entity definition.

As with all other entities, a system consists of the envelope types, `apiVersion` and `kind`, as well as generic `metadata` and a specific `spec`.

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-api-version-->"
    end="<!--end-api-version-->"
    heading-offset=2
%}

#### `kind` [Required]

The `kind` is the high level entity type being described. For a software system this must be `System`, e.g. `kind: System`.

Other available `kind`s are enumerated in the [entity types reference](../references/entity-types.md).

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-metadata-->"
    end="<!--end-metadata-->"
    heading-offset=2
%}

#### `spec` [Required]

The actual specification data that describes the entity. See [spec definition below](#spec)

### Metadata Contents

{%
    include-markdown "../references/entity-metadata.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}

### Spec Contents

{%
    include-markdown "../references/system-spec.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}
