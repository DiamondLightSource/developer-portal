import { Content, PageWithHeader } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SoftwareCatalogCard = () => {
  const navigate = useNavigate();
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/catalog')}>
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
          <Button
            size="medium"
            color="primary"
            onClick={() => navigate('/catalog')}
          >
            Visit
          </Button>
        </CardActions>
      </CardActionArea>
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
        </Grid>
      </Content>
    </PageWithHeader>
  );
};
