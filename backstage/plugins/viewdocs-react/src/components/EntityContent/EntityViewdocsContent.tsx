import { MissingAnnotationEmptyState } from '@backstage/core-components';
import React from 'react';
import { VIEWDOCS_ANNOTATION } from '../..';
import { useViewdocsUrl } from '../../hooks';

/**
 *
 * Displays an embedded documentation page
 *
 * @public
 */
export const EntityViewdocsContent = () => {
  const docs_src = useViewdocsUrl();

  if (docs_src === undefined)
    return <MissingAnnotationEmptyState annotation={VIEWDOCS_ANNOTATION} />;

  return (
    <iframe src={docs_src} title="Embedded Docs" width="100%" height="100%" />
  );
};
