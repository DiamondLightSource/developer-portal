# Common Component Types

<!--excerpt-start-->

Whilst the `spec.type` of a `Component` may be any string, it is strongly recommended that you use one of the common values. Futher to this, tools including Backstage itself may read this field and behave differently depending on its value. For example, a website type component may present tooling in the Backstage interface that is specific to just websites. Thus we recommend that when specifying a component one of the following is used in this field:

- `service` - a backend service, typically exposing an API
- `website` - a website
- `library` - a software library

<!--excerpt-end-->

These are selected such that they overlap with the common component types described in the [backstage documentation](https://backstage.io/docs/features/software-catalog/descriptor-format/#spectype-required), but should be added to and ammended to reflect usage.
