# Common Lifecycle Stages

<!--excerpt-start-->

Whilst the `spec.type` of a `Component` or `API` may be any string, understanding is made easier by sticking to a small set of well-known and common values. Thus we recommend that when specifying an entity one of the following is used in this field:

- `experimental` - an experiment or early, non-production entity, signaling that users may not prefer to consume it over other more established entities, or that there are low or no reliability guarantees
- `production` - an established, owned, maintained entity
- `deprecated` - an entity that is at the end of its lifecycle, and may disappear at a later point in time

<!--excerpt-end-->

These are selected such that they overlap with the common lifecycle stages described in the [backstage documentation](https://backstage.io/docs/features/software-catalog/descriptor-format/#speclifecycle-required), but should be added to and ammended to reflect usage.
