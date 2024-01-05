import { CatalogClient } from '@backstage/catalog-client';
import { ScmIntegrations } from '@backstage/integration';
import {
  createBuiltinActions,
  createRouter,
} from '@backstage/plugin-scaffolder-backend';
import { createFetchCopierAction } from '@backstage/plugin-scaffolder-backend-module-copier';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const actions = [
    ...createBuiltinActions({
      integrations,
      catalogClient,
      config: env.config,
      reader: env.reader,
    }),
    createFetchCopierAction({ integrations, reader: env.reader }),
  ];

  return await createRouter({
    catalogClient,
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    identity: env.identity,
    scheduler: env.scheduler,
  });
}
