import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import { AppIcon } from 'components/app-icon';

import { AppDrawer } from './components/app-drawer';
import { PersonalCard } from './components/personal-card';

export function Main() {
  return (
    <>
      <Outlet />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <PersonalCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppDrawer title='Apps'>
            <AppIcon name='Spotify' />
            <AppIcon name='Playstation' />
            <AppIcon name='GitHub' />
          </AppDrawer>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppDrawer title='Misc'>
            <AppIcon name='Settings' />
            <AppIcon
              name='Minesweeper'
              onTap={() =>
                window.open(`https://sutne.github.io/games`, '_blank')
              }
            />
          </AppDrawer>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppDrawer title='Contact Me'>
            <AppIcon
              name='Mail'
              onTap={() =>
                (window.location.href = `mailto:sivertutne@gmail.com`)
              }
            />
          </AppDrawer>
        </Grid>
      </Grid>
    </>
  );
}
