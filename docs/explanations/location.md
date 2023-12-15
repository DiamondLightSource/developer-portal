# Locations

## Summary

A location is a marker that references other places to look for catalog data. These are often used to register multiple entities with the catalog from a single discovery location by performing redirection to adjacent entity descriptors.

## Definition

!!! info "Backstage Docs"

    See [the backstage docs](https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-location) for a full description of the `Location` entity definition.

As with all other entities, a location consists of the envelope types, `apiVersion` and `kind`, as well as generic `metadata` and a specific `spec`.

{%
    include-markdown "../references/entity-envelope.md"
    start="<!--start-api-version-->"
    end="<!--end-api-version-->"
    heading-offset=1
%}

### `kind` [Required]

The `kind` is the high level entity type being described. For an entity location this must be `Location`, e.g. `kind: Location`.

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
    include-markdown "../references/location-spec.md"
    start="<!--start-fields-->"
    end="<!--end-fields-->"
    heading-offset=2
%}
