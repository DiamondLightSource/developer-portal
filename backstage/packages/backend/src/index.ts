import { createBackend } from '@backstage/backend-defaults';
import {
  catalogPluginGitlabFillerProcessorModule,
  gitlabPlugin,
} from '@immobiliarelabs/backstage-plugin-gitlab-backend';

const backend = createBackend();

// Auth
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));

// Catalog with Scaffolder module
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
// LDAP identity provider
backend.add(import('@backstage/plugin-catalog-backend-module-ldap'));
// GitHub entity provider
backend.add(import('@backstage/plugin-catalog-backend-module-github'));
// GitLab entity provider
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab'));
// Placeholder resolver for openapi and asyncapi
backend.add(import('@backstage/plugin-catalog-backend-module-openapi'));

// GitLab
backend.add(gitlabPlugin);
backend.add(catalogPluginGitlabFillerProcessorModule);

// Proxy
backend.add(import('@backstage/plugin-proxy-backend'));

// Search - Lunr as search engine
backend.add(import('@backstage/plugin-search-backend'));
// Catalog and Techdocs collators
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// Techdocs
backend.add(import('@backstage/plugin-techdocs-backend'));

// backend.add(legacyPlugin('scaffolder', import('./plugins/scaffolder')));

backend.start();
