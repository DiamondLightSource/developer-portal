import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { apiDocsPlugin } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { orgPlugin } from '@backstage/plugin-org';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { SearchPage } from '@backstage/plugin-search';
import {
  DefaultTechDocsHome,
  TechDocsIndexPage,
  TechDocsReaderPage,
  techdocsPlugin,
} from '@backstage/plugin-techdocs';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { themes, UnifiedThemeProvider } from '@backstage/theme';
import NightsStay from '@material-ui/icons/NightsStay';
import LightIcon from '@material-ui/icons/WbSunny';
import React from 'react';
import { Route } from 'react-router-dom';
import { apis } from './apis';
import { Root } from './components/Root';
import { entityPage } from './components/catalog/EntityPage';
import { DeveloperGuidePage } from './components/dev-guide/GuideDocsPage';
import { HomePage } from './components/home/HomePage';
import { PortalDocsPage } from './components/portal-docs/PortalDocsPage';
import { searchPage } from './components/search/SearchPage';
import { PrefixNavigate } from './components/utils/PrefixNavigate';
import { diamondDarkTheme } from './themes/diamondDarkTheme';
import { diamondLightTheme } from './themes/diamondLightTheme';

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },

  themes: [
    {
      id: 'diamond-light-theme',
      title: 'Diamond Light Theme',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={diamondLightTheme} children={children} />
      ),
    },
    {
      id: 'diamond-dark-theme',
      title: 'Diamond Dark Theme',
      variant: 'dark',
      icon: <NightsStay />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={diamondDarkTheme} children={children} />
      ),
    },
    {
      id: 'default-dark-theme',
      title: 'Backstage Default Dark Theme',
      variant: 'dark',
      icon: <NightsStay />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={themes.dark} children={children} />
      ),
    },
    {
      id: 'default-light-theme',
      title: 'Backstage Default Light Theme',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={themes.light} children={children} />
      ),
    },
  ],
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route>
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route path="/guide" element={<DeveloperGuidePage />} />
    <Route path="/portal-docs" element={<PortalDocsPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />}>
      <DefaultTechDocsHome />
    </Route>
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route
      path="/docs/default/component/developer-guide/*"
      element={
        <PrefixNavigate
          fromPrefix="/docs/default/component/developer-guide"
          toPrefix="/guide"
          replace
        />
      }
    />
    <Route path="/create" element={<ScaffolderPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
