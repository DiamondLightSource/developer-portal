# Entity Envelope

The root fields `apiVersion`, `kind`, `metadata`, and `spec` are part of the envelope, defining the overall structure of all `kind`s of entity. Likewise, some `metadata` fields like `name`, `labels`, and `annotations` are of special significance and have reserved purposes and distinct shapes.

<!--start-api-version-->

## `apiVersion` [Required]

The `apiVersion` is the version of specification format for that particular entity that the specification is made against. The version is used for being able to evolve the format and to distinguish them from other types of object that share the same type of structure - e.g. Kubernetes object manifests.

At present all entity descriptors should be given an `apiVersion` of `backstage.io/v1alpha1`. This will change as backstage develops or if we choose to add custom entity `kind`s to the portal.

<!--end-api-version-->

## `kind` [Required]

The `kind` is the high level entity type being described. The available `kind`s are enumerated in the [entity types reference](../references/entity-types.md).

<!--start-metadata-->

## `metadata` [Required]

A structure that contains metadata about the entity, i.e. things that aren't directly part of the entity specification itself. See [the entity metadata reference](entity-metadata.md) for more details about this structure.

<!--end-metadata-->

## `spec` [Required]

The actual specification data that describes the entity.

The precise structure of the spec depends on the `apiVersion` and `kind` combination, and some `kind`s may not even have a spec at all. See individual entity references for the specification structure of specific `kind`s.
