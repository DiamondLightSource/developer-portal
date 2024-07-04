import { PageWithHeader } from '@backstage/core-components';
import { useRouteRefParams } from '@backstage/core-plugin-api';
import { TechDocsReaderPageContent } from '@backstage/plugin-techdocs';
import { TechDocsReaderPageProvider } from '@backstage/plugin-techdocs-react';
import React from 'react';
import { rootDocsRouteRef } from '../../routes';

export function PortalDocsPage() {
  const { kind, name, namespace } = useRouteRefParams(rootDocsRouteRef);
  const entityRef = { kind, name, namespace };
  return (
    <PageWithHeader title="Developer Portal Docs" themeId="documentation">
      <TechDocsReaderPageProvider entityRef={entityRef}>
        <TechDocsReaderPageContent />
      </TechDocsReaderPageProvider>
    </PageWithHeader>
  );
}
