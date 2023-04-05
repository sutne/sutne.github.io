import React from 'react';
import { Grid, Typography } from '@mui/material';

import { PersonalCard } from 'cards/personal-card';
import { App } from 'components/app';
import { AppDrawer } from 'components/app-drawer';
import { AppIcon } from 'components/app-icon';
import { useTheme } from 'providers/theme-provider';

import { Spotify } from './Spotify/Spotify';



// xs, extra-small: 0px-599px
// sm, small: 600px-899px
// md, medium: 900px +

export function Main() {
  const { swapTheme } = useTheme();
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