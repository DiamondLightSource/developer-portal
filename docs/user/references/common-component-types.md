# Common Component Types

Whilst the `spec.type` of a `Component` may be any string, understanding is made easier by sticking to a small set of well-known and common values. Thus we recommend that when specifying a component one of the following is used in this field:

- `service` - a backend service, typically exposing an API
- `website` - a website
- `library` - a software library

These are selected such that they overlap with the common component types described in the [backstage documentation](https://backstage.io/docs/features/software-catalog/descriptor-format/#spectype-required), but should be added to and ammended to reflect usage.
