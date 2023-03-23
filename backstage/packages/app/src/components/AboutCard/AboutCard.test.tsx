import { RELATION_OWNED_BY } from '@backstage/catalog-model';
import { ConfigReader } from '@backstage/core-app-api';
import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
} from '@backstage/integration-react';
import {
  CatalogApi,
  catalogApiRef,
  EntityProvider,
  entityRouteRef,
} from '@backstage/plugin-catalog-react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { EntityAboutCard } from './AboutCard';

describe('<AboutCard />', () => {
  const catalogApi: jest.Mocked<CatalogApi> = {
    getLocationById: jest.fn(),
    getEntityByName: jest.fn(),
    getEntities: jest.fn(),
    addLocation: jest.fn(),
    getLocationByRef: jest.fn(),
    removeEntityByUid: jest.fn(),
    refreshEntity: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders info', async () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        description: 'This is the description',
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
      relations: [
        {
          type: RELATION_OWNED_BY,
          targetRef: 'user:default/guest',
          target: {
            kind: 'user',
            name: 'guest',
            namespace: 'default',
          },
        },
      ],
    };

    await renderInTestApp(
      <TestApiProvider
        apis={[
          [
            scmIntegrationsApiRef,
            ScmIntegrationsApi.fromConfig(
              new ConfigReader({
                integrations: {},
              }),
            ),
          ],
          [catalogApiRef, catalogApi],
        ]}
      >
        <EntityProvider entity={entity}>
          <EntityAboutCard />
        </EntityProvider>
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/catalog/:namespace/:kind/:name': entityRouteRef,
        },
      },
    );

    expect(screen.getByText('service')).toBeInTheDocument();
    expect(screen.getByText('user:guest')).toBeInTheDocument();
    expect(screen.getByText('production')).toBeInTheDocument();
    expect(screen.getByText('This is the description')).toBeInTheDocument();
  });

  it('renders "view source" link', async () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        annotations: {
          'backstage.io/source-location':
            'url:https://github.com/backstage/backstage/blob/master/software.yaml',
        },
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };

    await renderInTestApp(
      <TestApiProvider
        apis={[
          [
            scmIntegrationsApiRef,
            ScmIntegrationsApi.fromConfig(
              new ConfigReader({
                integrations: {
                  github: [
                    {
                      host: 'github.com',
                      token: '...',
                    },
                  ],
                },
              }),
            ),
          ],
          [catalogApiRef, catalogApi],
        ]}
      >
        <EntityProvider entity={entity}>
          <EntityAboutCard />
        </EntityProvider>
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/catalog/:namespace/:kind/:name': entityRouteRef,
        },
      },
    );
    expect(screen.getByText('View Source').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/backstage/backstage/blob/master/software.yaml',
    );
  });

  it('renders "edit metadata" button', async () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        annotations: {
          'backstage.io/edit-url':
            'https://github.com/backstage/backstage/edit/master/software.yaml',
        },
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };

    await renderInTestApp(
      <TestApiProvider
        apis={[
          [
            scmIntegrationsApiRef,
            ScmIntegrationsApi.fromConfig(
              new ConfigReader({
                integrations: {
                  github: [
                    {
                      host: 'github.com',
                      token: '...',
                    },
                  ],
                },
              }),
            ),
          ],
          [catalogApiRef, catalogApi],
        ]}
      >
        <EntityProvider entity={entity}>
          <EntityAboutCard />
        </EntityProvider>
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/catalog/:namespace/:kind/:name': entityRouteRef,
        },
      },
    );

    const editLink = screen.getByTitle('Edit Metadata').closest('a');
    expect(editLink).toHaveAttribute(
      'href',
      'https://github.com/backstage/backstage/edit/master/software.yaml',
    );
  });

  it('renders disabled "view source" link', async () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };

    await renderInTestApp(
      <TestApiProvider
        apis={[
          [
            scmIntegrationsApiRef,
            ScmIntegrationsApi.fromConfig(new ConfigReader({})),
          ],
          [catalogApiRef, catalogApi],
        ]}
      >
        <EntityProvider entity={entity}>
          <EntityAboutCard />
        </EntityProvider>
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/catalog/:namespace/:kind/:name': entityRouteRef,
        },
      },
    );
    expect(screen.getByText('View Source')).toBeVisible();
    expect(screen.getByText('View Source').closest('a')).toBeNull();
  });

  it.each([
    'url:https://backstage.io/catalog-info.yaml',
    'file:../../catalog-info.yaml',
  ])('triggers a refresh for %s', async location => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        annotations: {
          'backstage.io/managed-by-location': location,
        },
        name: 'software',
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };

    await renderInTestApp(
      <TestApiProvider
        apis={[
          [
            scmIntegrationsApiRef,
            ScmIntegrationsApi.fromConfig(new ConfigReader({})),
          ],
          [catalogApiRef, catalogApi],
        ]}
      >
        <EntityProvider entity={entity}>
          <EntityAboutCard />
        </EntityProvider>
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/catalog/:namespace/:kind/:name': entityRouteRef,
        },
      },
    );

    expect(catalogApi.refreshEntity).not.toHaveBeenCalledWith(
      'component:default/software',
    );

    await userEvent.click(screen.getByTitle('Schedule entity refresh'));

    expect(catalogApi.refreshEntity).toHaveBeenCalledWith(
      'component:default/software',
    );
  });

  it('should not render refresh button if the location is not an url or file', async () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };

    await renderInTestApp(
      <TestApiProvider
        apis={[
          [
            scmIntegrationsApiRef,
            ScmIntegrationsApi.fromConfig(new ConfigReader({})),
          ],
          [catalogApiRef, catalogApi],
        ]}
      >
        <EntityProvider entity={entity}>
          <EntityAboutCard />
        </EntityProvider>
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/catalog/:namespace/:kind/:name': entityRouteRef,
        },
      },
    );

    expect(
      screen.queryByTitle('Schedule entity refresh'),
    ).not.toBeInTheDocument();
  });
});
