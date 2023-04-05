import { useEntity } from '@backstage/plugin-catalog-react';
import { renderInTestApp } from '@backstage/test-utils';
import { screen } from '@testing-library/react';
import React from 'react';
import { VIEWDOCS_ANNOTATION } from '../..';
import { EntityViewdocsContent } from './EntityViewdocsContent';

jest.mock('@backstage/plugin-catalog-react');

const mockUseEntity = useEntity as jest.MockedFunction<typeof useEntity>;

beforeEach(() => {
  mockUseEntity.mockReset();
});

describe('EntityViewdocsComponent', () => {
  it('should render embedded', async () => {
    mockUseEntity.mockReturnValue({
      entity: {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'component',
        metadata: {
          name: 'mock-component',
          annotations: {
            [VIEWDOCS_ANNOTATION]:
              'https://diamondlightsource.github.io/developer-portal/',
          },
        },
      },
    });

    await renderInTestApp(<EntityViewdocsContent />);

    expect(screen.getByTitle('Embedded Docs')).toBeInTheDocument();
  });

  it('should show missing annotation', async () => {
    mockUseEntity.mockReturnValue({
      entity: {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'component',
        metadata: {
          name: 'mock-component',
        },
      },
    });
    await renderInTestApp(<EntityViewdocsContent />);

    expect(screen.getByText('Missing Annotation')).toBeInTheDocument();
  });
});
