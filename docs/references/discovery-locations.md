# Discovery Locations

The developer portal is configured to search a number of locations for entity descriptors (commonly a `catalog-info.yaml` file). These locations include, by type:

<!--start-locations-->

Git:

<!--start-git-locations-->

- `github.com/DiamondLightSource`
  - Entity descriptors at `/catalog-info.yaml`
- `github.com/dls-controls`
  - Entity descriptors at `/catalog-info.yaml`
- `gitlab.diamond.ac.uk`
  - Entity descriptors at `/catalog-info.yaml`

<!--end-git-locations-->

LDAP:

<!--start-ldap-locations-->

- `ralfed.cclrc.ac.uk`
  - [Users](../explanations/user.md)

<!--end-ldap-locations-->

<!--start-miscellaneous-locations-->

Miscellaneous:

- `gitlab.diamond.ac.uk/sscc-docs/groups`
  - [Groups](../explanations/group.md)

<!--end-miscellaneous-locations-->

<!--end-locations-->

These locations are defined in the `catalog.providers` section of the backstage configuration file `backstage/app-config.yaml` ([on main :link:](https://github.com/DiamondLightSource/developer-portal/blob/main/backstage/app-config.yaml)).
