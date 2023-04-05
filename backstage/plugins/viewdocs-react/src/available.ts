import { Entity } from '@backstage/catalog-model';
import { VIEWDOCS_ANNOTATION } from '.';

/**
 * Helper that takes in entity and returns true/false if ViewDocs is available for the entity
 *
 * @public
 */
export const isViewDocsAvailable = (entity: Entity) =>
  Boolean(entity?.metadata?.annotations?.[VIEWDOCS_ANNOTATION]);
