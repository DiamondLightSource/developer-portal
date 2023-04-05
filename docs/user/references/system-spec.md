# System Spec

<!--start-fields-->

## `owner` [Required]

{%
    include-markdown "../common/entity-owner.md"
%}

## `domain` [Optional]

An [entity reference](https://backstage.io/docs/features/software-catalog/references#string-references) to the [Domain](../explanations/domain.md) that the system belongs to, e.g. `developer-tooling`. There is no requirement for this Domain to be created within the same location; Existing Domains can be listed in the catalog by filtering by `Kind` of `Domain`.

<!--end-fields-->
