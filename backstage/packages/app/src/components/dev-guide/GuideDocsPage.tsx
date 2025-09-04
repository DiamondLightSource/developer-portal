import { PageWithHeader } from '@backstage/core-components';
import React from 'react';

export const DeveloperGuidePage = () => (
  <PageWithHeader title="Developer Guide" themeId="documentation">
    <div style={{ padding: '24px' }}>
      <h2>Developer Guide</h2>
      <p>
        The Developer Guide has moved to{' '}
        <a
          href="https://dev-guide.diamond.ac.uk"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          https://dev-guide.diamond.ac.uk
        </a>
      </p>
    </div>
  </PageWithHeader>
);
