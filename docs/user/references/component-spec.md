# Component Spec

<!--start-fields-->

## `type` [Required]

The type of Component as a string, e.g. `type: service`.

{%
    include-markdown "../references/common-component-types.md"
    start="<!--excerpt-start-->"
    end="<!--excerpt-end-->"
%}

## `lifecycle` [Required]

The lifecycle state of the Component as a string, e.g. `lifecycle: production`.

{%
    include-markdown "../references/common-lifecycle-stages.md"
    start="<!--excerpt-start-->"
    end="<!--excerpt-end-->"
%}

## `owner` [Required]

{%
    include-markdown "../common/entity-owner.md"
%}

## `system` [Optional]

{%
    include-markdown "../common/entity-system.md"
%}

## `subcomponentOf` [Optional]

An [entity reference](https://backstage.io/docs/features/software-catalog/references#string-references) to another Component of which this Component is part of, e.g. `subComponentOf: developer-portal-frontend`.

## `providesApis` [Optional]

An array of [entity references](https://backstage.io/docs/features/software-catalog/references#string-references) to the APIs that are provided by the Component, e.g. `providesApis: [developer-portal-backend-rest]`

## `consumesApis` [Optional]

An array of [entity references](https://backstage.io/docs/features/software-catalog/references#string-references) to the APIs that are consumed by the Component, e.g. `consumesApis: [developer-portal-backend-rest]`

## `dependsOn` [Optional]

An array of [entity references](https://backstage.io/docs/features/software-catalog/references#string-references) to the Components and Resources that the Component depends on, e.g. `dependsOn: [component:developer-portal-backend]`

<!--end-fields-->
