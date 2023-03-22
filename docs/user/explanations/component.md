# Components

## Summary

A Component describes a software component. It is typically intimately linked to the source code that constitutes the component, and should be what a developer may regard a "unit of software", usually with a distinct deployable or linkable artifact.

## Definition

!!! info "Backstage Docs"

    See [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-component) for a full description of the `Component` entity definition.

As with all other entities, a component consists of the envelope types, `apiVersion` and `kind`, as well as generic `metadata` and a specific `spec`.

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-api-version-->"
    end="<!--end-api-version-->"
    heading-offset=2
%}

#### `kind` [Required]

The `kind` is the high level entity type being described. For a software component this must be `Component`, e.g. `kind: Component`.

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
    include-markdown "../references/component-spec.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}
