import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { GithubEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import { GitlabDiscoveryEntityProvider } from "@backstage/plugin-catalog-backend-module-gitlab";
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = CatalogBuilder.create(env);
  builder.addEntityProvider(
    GithubEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      scheduler: env.scheduler,
    }),
  );
  builder.addEntityProvider(
    GitlabDiscoveryEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      scheduler: env.scheduler
    })
  )
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
