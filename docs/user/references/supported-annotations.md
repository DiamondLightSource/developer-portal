# Supported Annotations

The following annotations are supported for entities in the Developer Portal:

- `github.com/project-slug` - This should be set to the project slug of a component hosted on GitHub, e.g. `DiamondLightSource/developer-portal`, and will allow the [GitHub Actions plugin](https://github.com/backstage/backstage/tree/master/plugins/github-actions) to ingress the CI/CD pipeline status of your component.
- `backstage.io/techdocs-ref` - This should be set to build techdocs documentation into the "docs" panel of an entity. Where possible this is preffered to embedding as it allows indexing for search. See also: `diamond.ac.uk/viewdocs-url`
- `diamond.ac.uk/viewdocs-url` - This should be set to embed external documentation into the "docs" panel of an entity. See also: `backstage.io/techdocs-ref`
