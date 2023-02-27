import { Content, PageWithHeader } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import React from 'react';

const SoftwareCatalogCard = () => {
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';

  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5">
          <CategoryIcon /> Software Catalog
        </Typography>
        <Typography variant="body2">
          A central location to discover software components developed at{' '}
          {orgName}.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary" href="/catalog">
          Visit
        </Button>
      </CardActions>
    </Card>
  );
};

const DeveloperGuideCard = () => {
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';

  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5">
          <LibraryBooksIcon /> Developer Guide
        </Typography>
        <Typography variant="body2">
          Extensive documentation on developing software at {orgName}. Including
          Tutorials, How-Tos, Explanations & References.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary" href="/guide">
          Visit
        </Button>
      </CardActions>
    </Card>
  );
};

export const HomePage = () => {
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';

  return (
    <PageWithHeader title={`${orgName} Developer Portal`} themeId="home">
      <Content>
        <Grid
          container
          justifyContent="center"
          spacing={6}
          alignItems="stretch"
        >
          <Grid item xs={12} md={6} lg={4}>
            <SoftwareCatalogCard />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DeveloperGuideCard />
          </Grid>
        </Grid>
      </Content>
    </PageWithHeader>
  );
};
