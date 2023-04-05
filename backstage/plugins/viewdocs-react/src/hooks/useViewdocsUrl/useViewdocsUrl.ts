import { useEntity } from '@backstage/plugin-catalog-react';
import { VIEWDOCS_ANNOTATION } from '../..';

/**
 *
 * Gets the viewdocs url from the entity annotation if available
 *
 * @public
 */
export function useViewdocsUrl() {
  const { entity } = useEntity();
  return entity.metadata.annotations?.[VIEWDOCS_ANNOTATION];
}
