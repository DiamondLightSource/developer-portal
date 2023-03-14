# Common API Types

Whilst the `spec.type` of a `API` may be any string, visualisation is only available for a small subset. Further to this, understanding is made easier by sticking to a small set of well-known and common values. Thus we recommend that when specifying an API one of the following is used in this field:

- `openapi` - an API definition in YAML or JSON format based on the [OpenAPI](https://swagger.io/specification/) version 2 or version 3 spec
- `asyncapi` - an API definition based on the [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest/) spec
- `graphql` - an API definition based on [GraphQL](https://spec.graphql.org/) schemas for consuming [GraphQL](https://graphql.org/) based APIs
- `grpc` - an API definition based on [Protocol Buffers](https://developers.google.com/protocol-buffers) to use with [gRPC](https://grpc.io/)

These are selected such that they overlap with the common API types described in the [backstage documentation](https://backstage.io/docs/features/software-catalog/descriptor-format/#spectype-required-2), but should be added to and ammended to reflect usage.
