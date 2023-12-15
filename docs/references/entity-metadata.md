# Entity Metadata

The metadata root field has a number of reserved fields with specific meaning, described below.

In addition to these, you may add any number of other fields directly under metadata, but be aware that general plugins and tools may not be able to understand their semantics. See Extending the model for more information.

<!--start-fields-->

## `name` [Required]

The name of the entity. This name is both meant for human eyes to recognize the entity, and for machines and other components to reference the entity, e.g. `visits-tracking-service`

Names must be unique per kind, at any point in time. This uniqueness constraint is case insensitive. Names may be reused at a later time, after an entity is deleted from the registry.

Names are required to follow a certain format. Entities that do not follow those rules will not be accepted for registration in the catalog. The required format is as follows:

- Strings of length at least 1, and at most 63
- Must consist of sequences of `[a-z0-9A-Z]` possibly separated by one of `[-_.]`

## `title` [Optional]

A display name of the entity, to be presented in user interfaces instead of the `name` property above, when available.

This field is sometimes useful when the name is cumbersome or ends up being perceived as overly technical. The title generally does not have as stringent format requirements on it, so it may contain special characters and be more explanatory. Do keep it very short though, and avoid situations where a title can be confused with the name of another entity, or where two entities share a title.

Note that this is only for display purposes, and may be ignored by some parts of the code. [Entity references](https://backstage.io/docs/features/software-catalog/references) still always make use of the name property for example, not the title.

## `description` [Optional]

A human readable description of the entity, to be shown in the developer portal. Should be kept short and informative, suitable to give an overview of the entity's purpose at a glance. More detailed explanations and documentation should be placed elsewhere.

## `labels` [Optional]

Labels are optional key/value pairs of that are attached to the entity, and their use is identical to [Kubernetes object labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

Their main purpose is for references to other entities, and for information that is in one way or another classifying for the current entity. They are often used as values in queries or filters.

Both the key and the value are strings, subject to the following restrictions.

Keys have an optional prefix followed by a slash, and then the name part which is required. The prefix, if present, must be a valid lowercase domain name, at most 253 characters in total. The name part must be sequences of `[a-zA-Z0-9]` separated by any of `[-_.]`, at most 63 characters in total.

The `backstage.io/` prefix is reserved for use by Backstage core components.

Values are strings that follow the same restrictions as `name` above.

## `annotations` [Optional]

An object with arbitrary non-identifying metadata attached to the entity, identical in use to [Kubernetes object annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

Their purpose is mainly, but not limited, to reference into external systems. This could for example be a reference to the git ref the entity was ingested from, to monitoring and logging systems, to PagerDuty schedules, etc. Users may add these to descriptor YAML files, but in addition to this automated systems may also add annotations, either during ingestion into the catalog, or at a later time.

Both the key and the value are strings, subject to the following restrictions.

Keys have an optional prefix followed by a slash, and then the name part which is required. The prefix must be a valid lowercase domain name if specified, at most 253 characters in total. The name part must be sequences of `[a-zA-Z0-9]` separated by any of `[-_.]`, at most 63 characters in total.

The `backstage.io/` prefix is reserved for use by Backstage core components.

Values can be of any length, but are limited to being strings.

## `tags` [Optional]

A list of single-valued strings, for example to classify catalog entities in various ways. This is different to the labels in metadata, as labels are key-value pairs.

The values are user defined, for example the programming language used for the component, like java or go.

This field is optional, and currently has no special semantics.

Each tag must be sequences of `[a-z0-9]` separated by `-`, at most 63 characters in total.

## `links` [Optional]

A list of external hyperlinks related to the entity. Links can provide additional contextual information that may be located outside of the developer portal itself. For example, an admin dashboard or external CMS page.

Users may add links to descriptor YAML files to provide additional reference information to external content & resources. Links are not intended to drive any additional functionality within Backstage, which is best left to annotations and labels. It is recommended to use links only when an equivalent well-known annotation does not cover a similar use case.

Fields of a link are:

### `url` [Required]

A `url` in a standard `uri` format, e.g. `url: https://example.com/some/page`

### `title` [Optioanl]

A user friendly display name for the link, e.g. `title: Example Website`

### `icon` [Optional]

A key representing a visual icon to be displayed in the UI, e.g. `icon: docs`

The icon field value is meant to be a semantic key that will map to a specific icon that may be provided by an icon library (e.g. `material-ui` icons). These keys should be a sequence of `[a-z0-9A-Z]`, possibly separated by one of `[-_.]`. The default backstage icon-component mappings are used, see the [app-defaults](https://github.com/backstage/backstage/blob/master/packages/app-defaults/src/defaults/icons.tsx) for details. A generic fallback icon would be provided if a mapping cannot be resolved.

<!--end-fields-->
