# Embed a Linkdocs Site

## Preface

This how-to will take you through the steps of embedding a documentation site in the developer portal catalog with use of the linkdocs plugin for backstage. This how-to guide assumes you have:

- **A hosted docs site** - available to the same set of users as the developer portal.
- **An entity descriptor** - which is indexed by the developer portal.

!!! hint

    See [how to register a component](register-a-component.md) for a run down of how to create your entity descriptor and have the catalog index it

## Add annotation

In order to make an embedded version of your docs site available on the developer portal, we must provide the `diamond.ac.uk/viewdocs-url` annotation. This annotation should point to the URL at which the docs are hosted.

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
      name: developer-portal-backend
      annotations:
        diamond.ac.uk/viewdocs-url: https://diamondlightsource.github.io/developer-portal/
    spec:
      owner: user:enu43627
    ```
