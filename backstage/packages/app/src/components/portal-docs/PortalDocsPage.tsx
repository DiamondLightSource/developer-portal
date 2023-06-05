import { PageWithHeader } from '@backstage/core-components';
import { TechDocsReaderPageContent } from '@backstage/plugin-techdocs';
import { TechDocsReaderPageProvider } from '@backstage/plugin-techdocs-react';
import React from 'react';

export const PortalDocsPage = () => (
  <PageWithHeader title="Developer Portal Docs" themeId="documentation">
    <TechDocsReaderPageProvider
      entityRef={{
        kind: 'system',
        namespace: 'default',
        name: 'developer-portal',
      }}
    >
      <TechDocsReaderPageContent />
    </TechDocsReaderPageProvider>
  </PageWithHeader>
);
