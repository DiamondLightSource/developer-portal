# Entity Ingress

<!--start--contents-->

The diamond developer portal is configured such that entity ingress must be performed via discovery, allowing it to act as a transparent window onto the software and services currently developed and deployed at Diamond.

As a consequence of this, for a entity to become available in the catalogue, an entity descriptor (commonly a `catalog-info.yaml` file) must be be made available in one of the [discovery locations](../references/discovery-locations.md), these are:

{%
    include-markdown "../references/discovery-locations.md"
    start="<!--start--locations-->"
    end="<!--end--locations-->"
%}

<!--end--contents-->
