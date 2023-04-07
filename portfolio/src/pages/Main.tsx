import React from 'react';
import { Grid } from '@mui/material';

import { PersonalCard } from 'cards/personal-card';
import { App } from 'components/app';
import { AppDrawer } from 'components/app-drawer';

import { Playstation } from './Playstation/Playtsation';
import { Settings } from './Settings/Settings';
import { Spotify } from './Spotify/Spotify';

export function Main() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <PersonalCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppDrawer title='Apps'>
          <Settings />
          <Spotify />
          <Playstation />
        </AppDrawer>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppDrawer title='External'>
          <App
            name='Mail'
            onTap={() => (window.location.href = `mailto:sivertutne@gmail.com`)}
          />
        </AppDrawer>
      </Grid>
    </Grid>
  );
}
