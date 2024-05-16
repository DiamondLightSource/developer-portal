import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'techdocs:index-page',
});

export const rootDocsRouteRef = createRouteRef({
  id: 'techdocs:reader-page',
  params: ['namespace', 'kind', 'name'],
});

export const rootCatalogDocsRouteRef = createRouteRef({
  id: 'techdocs:catalog-reader-view',
});
