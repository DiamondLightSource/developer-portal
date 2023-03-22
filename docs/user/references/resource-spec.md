# Resource Spec

<!--start-fields-->

## `owner` [Required]

{%
    include-markdown "../common/entity-owner.md"
%}

## `type` [Required]

The type of resource as a string, e.g. database. There is currently no enforced set of values for this field, so it is left up to the user to decide an appropriate name, in doing so the user is encouraged to reference existing Resources on the developer portal.

Some common values for this field may include:

- `database`
- `s3-bucket`
- `cluster`

## `system` [Optional]

{%
    include-markdown "../common/entity-system.md"
%}

## `dependsOn` [Optional]

{%
    include-markdown "../common/entity-dependson.md"
%}

## `dependencyOf` [Optional]

An array of [entity references](https://backstage.io/docs/features/software-catalog/references#string-references) to the Components and Resources that this resource is a dependency of, e.g. `dependencyOf: [artist-lookup]`. Use of this field is discouraged in favour defining `dependsOn` on the dependant Component or Resource.

<!--end-fields-->
