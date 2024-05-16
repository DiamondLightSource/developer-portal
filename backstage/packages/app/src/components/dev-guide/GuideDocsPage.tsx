import { PageWithHeader } from '@backstage/core-components';
import { TechDocsReaderPageContent } from '@backstage/plugin-techdocs';
import { TechDocsReaderPageProvider } from '@backstage/plugin-techdocs-react';
import React from 'react';
import { rootDocsRouteRef } from '../../../routes';
import {
  getComponentData,
  useRouteRefParams,
} from '@backstage/core-plugin-api';

// based on this https://github.com/backstage/backstage/blob/master/plugins/techdocs/src/reader/components/TechDocsReaderPage/TechDocsReaderPage.tsx
export const DeveloperGuidePage = () => {
    const { kind, name, namespace } = useRouteRefParams(rootDocsRouteRef);
  const entityRef = {kind, name, namespace}
  const oldEntityRef={
        kind: 'component',
        namespace: 'default',
        name: 'developer-guide',
      }

   return <PageWithHeader title={name} themeId="documentation">
    <TechDocsReaderPageProvider entityRef={entityRef} >
      <TechDocsReaderPageContent />
    </TechDocsReaderPageProvider>
  </PageWithHeader>
};
