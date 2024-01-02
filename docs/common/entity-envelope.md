<!-- markdownlint-disable MD025 -->

# `apiVersion` [Required]

The `apiVersion` is the version of specification format for that particular entity that the specification is made against. The version is used for being able to evolve the format and to distinguish them from other types of object that share the same type of structure - e.g. Kubernetes object manifests.

At present all entity descriptors should be given an `apiVersion` of `backstage.io/v1alpha1`. This will change as backstage develops or if we choose to add custom entity `kind`s to the portal.

# `kind` [Required]

The `kind` is the high level entity type being described. The available `kind`s are enumerated in the [entity types reference](../references/entity-types.md).
