# Register Multiple Entities

## Preface

This how-to will take you through the steps of registering multiple entities in the catalogue from a single repository.

{%
  include-markdown "../common/get-repository.md"
  heading-offset=1
%}

{%
  include-markdown "../common/create-entity-descriptor.md"
  heading-offset=1
%}

### Entity Definitions

We can now create numerous entity descriptors seperated by `---`. These will be read independantly, as if they were their own entity-descriptor files.

!!! example

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
        name: developer-portal-backend
    spec:
        type: service

    ---

    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
        name: developer-portal-frontend
    spec:
        type: website
    ```
