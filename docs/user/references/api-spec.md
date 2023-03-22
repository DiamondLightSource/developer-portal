# API Spec

<!--start-fields-->

## `type` [Required]

The type of API as a string, e.g. `type: openapi`.

{%
    include-markdown "../references/common-api-types.md"
    start="<!--excerpt-start-->"
    end="<!--excerpt-end-->"
%}

## `lifecycle` [Required]

The lifecycle state of the API as a string, e.g. `lifecycle: production`.

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

## `definition` [Required]

The definition of the API, as a multi-line string, based on the format defined by `type`.

For example, where `type` is `openapi`:

```yaml
definition: |
  openapi: 3.0.0
  info:
    title: Backstage API
    version: 0.0.1
```

<!--end-fields-->
