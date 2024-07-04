import { PageWithHeader } from '@backstage/core-components';
import { useRouteRefParams } from '@backstage/core-plugin-api';
import { TechDocsReaderPageContent } from '@backstage/plugin-techdocs';
import { TechDocsReaderPageProvider } from '@backstage/plugin-techdocs-react';
import React from 'react';
import { rootDocsRouteRef } from '../../routes';

// based on this https://github.com/backstage/backstage/blob/master/plugins/techdocs/src/reader/components/TechDocsReaderPage/TechDocsReaderPage.tsx
export const DeveloperGuidePage = () => {
  const { kind, name, namespace } = useRouteRefParams(rootDocsRouteRef);

  const entityRef = { kind, name, namespace };

  return (
    <PageWithHeader title={name} themeId="diamond-theme">
      <TechDocsReaderPageProvider entityRef={entityRef}>
        <TechDocsReaderPageContent />
      </TechDocsReaderPageProvider>
    </PageWithHeader>
  );
};
