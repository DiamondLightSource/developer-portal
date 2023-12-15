# Location Spec

<!--start-fields-->

## `type` [Optional]

The single location type, that's common to the targets specified in the spec. Typically, this should be left empty such that the location type of the target is inherited from the location type of the location entity which defines it (i.e. your defined location). Other options include `url` - which instructs the catalog to retrieve the descriptor from the URL; or `file` - which instructs the catalog to retrieve the descriptor from a local file.

## `targets` [Optional]

A list of targets as strings. They can all be either absolute paths/URLs (depending on the type), or relative paths which are resolved relative to the location of this Location entity itself. e.g.:

```yaml
targets:
  - ./frontend/component-info.yaml
  - ./backend/component-info.yaml
  - ./backend/api-info.yaml
```

## `presence` [Optional]

Describes whether the target of a location is required to exist or not. It defaults to `required` if not specified, can also be `optional`.

<!--end-fields-->
