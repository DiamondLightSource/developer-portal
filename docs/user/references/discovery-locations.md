# Discovery Locations

The developer portal is configured to search a number of locations for entity descriptors (commonly a `catalog-info.yaml` file). These locations include, but are not limited to:

<!--start--locations-->

- `github.com/DiamondLightSource` (GIT)
  - Entity descriptors at `/catalog-info.yaml`
- `gitlab.diamond.ac.uk` (GIT)
  - Entity descriptors at `/catalog-info.yaml`
- `ralfed.cclrc.ac.uk` (LDAP)
  - Users

<!--end-locations-->

These locations are defined in the `catalog.providers` section of the backstage configuration file `backstage/app-config.yaml` ([on main :link:](https://github.com/DiamondLightSource/developer-portal/blob/main/backstage/app-config.yaml)).
