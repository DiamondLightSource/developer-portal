import { createBackend } from '@backstage/backend-defaults';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { gitlabAuthenticator } from '@backstage/plugin-auth-backend-module-gitlab-provider';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import {
  catalogPluginGitlabFillerProcessorModule,
  gitlabPlugin,
} from '@immobiliarelabs/backstage-plugin-gitlab-backend';

const customAuth = createBackendModule({
  // This ID must be exactly "auth" because that's the plugin it targets
  pluginId: 'auth',
  // This ID must be unique, but can be anything
  moduleId: 'custom-auth-provider',
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      async init({ providers }) {
        providers.registerProvider({
          providerId: 'gitlab',
          factory: createOAuthProviderFactory({
            authenticator: gitlabAuthenticator,
            async signInResolver(info, ctx) {
              console.log(info);
              const userEntity = 'user:default/guest';
              return ctx.issueToken({
                claims: {
                  sub: userEntity,
                  ent: [userEntity],
                },
              });
            },
          }),
        });
      },
    });
  },
});

const backend = createBackend();

// Auth
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(customAuth);

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
