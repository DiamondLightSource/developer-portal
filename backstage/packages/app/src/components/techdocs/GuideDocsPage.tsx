import { PageWithHeader } from '@backstage/core-components';
import { TechDocsReaderPageContent } from '@backstage/plugin-techdocs';
import { TechDocsReaderPageProvider } from '@backstage/plugin-techdocs-react';
import React from 'react';

export const DeveloperGuidePage = () => (
  <PageWithHeader title="Developer Guide" themeId="documentation">
    <TechDocsReaderPageProvider
      entityRef={{
        kind: 'component',
        namespace: 'default',
        name: 'developer-guide',
      }}
    >
      <TechDocsReaderPageContent withSearch={false} />
    </TechDocsReaderPageProvider>
  </PageWithHeader>
);
