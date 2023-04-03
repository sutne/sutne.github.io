import React from 'react';
import { Grid, Typography } from '@mui/material';

import { PersonalCard } from 'cards/personal-card';
import { App } from 'components/app';
import { AppDrawer } from 'components/app-drawer';
import { ThemeProvider } from 'providers/theme-provider';

import { Spotify } from './Spotify/Spotify';



// xs, extra-small: 0px-599px
// sm, small: 600px-899px
// md, medium: 900px +

export function Main() {
  return (
    <ThemeProvider >
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <PersonalCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppDrawer title="Productivity">
            <App name="Mail" ><Typography variant="body1">Spotify</Typography></App>
            <App name="Github" ><Typography variant="body1">Spotify</Typography></App>
            <Spotify />
          </AppDrawer>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppDrawer title="Games">
            <App name="Playstation" ><Typography variant="body1">Spotify</Typography></App>
            <App name="Minesweeper" ><Typography variant="body1">Spotify</Typography></App>
          </AppDrawer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}