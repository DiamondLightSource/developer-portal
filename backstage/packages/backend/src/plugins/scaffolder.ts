// packages/backend/src/plugins/scaffolder.ts

import { DockerContainerRunner } from '@backstage/backend-common';
import { CatalogClient } from '@backstage/catalog-client';
import { ScmIntegrations } from '@backstage/integration';
import { createBuiltinActions, createRouter } from '@backstage/plugin-scaffolder-backend';
import { createFetchCopierAction } from '@backstage/plugin-scaffolder-backend-module-copier';
import Docker from 'dockerode';


import { Router } from 'express';
import type { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);
  const dockerClient = new Docker();
  const containerRunner = new DockerContainerRunner({ dockerClient });

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });
  const actions = [...builtInActions, createFetchCopierAction({integrations, reader: env.reader, containerRunner})];
  return await createRouter({
    containerRunner,
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

