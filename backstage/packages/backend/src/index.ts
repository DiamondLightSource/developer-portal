import { legacyPlugin } from '@backstage/backend-common';
import { createBackend } from '@backstage/backend-defaults';
import {
  catalogPluginGitlabFillerProcessorModule,
  gitlabPlugin,
} from '@immobiliarelabs/backstage-plugin-gitlab-backend';

const backend = createBackend();
backend.add(legacyPlugin('auth', import('./plugins/auth')));
backend.add(legacyPlugin('catalog', import('./plugins/catalog')));

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

backend.add(legacyPlugin('scaffolder', import('./plugins/scaffolder')));

backend.start();
