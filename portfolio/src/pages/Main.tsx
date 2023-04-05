import React from 'react';
import { Grid } from '@mui/material';

import { PersonalCard } from 'cards/personal-card';
import { AppDrawer } from 'components/app-drawer';

import { Spotify } from './Spotify/Spotify';


export function Main() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <PersonalCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppDrawer title='Music'>
          <Spotify />
        </AppDrawer>
      </Grid>
    </Grid>
  );
}