import React from 'react';
import { Grid } from '@mui/material';

import { PersonalCard } from 'cards/personal-card';
import { App } from 'components/app';
import { AppDrawer } from 'components/app-drawer';



// xs, extra-small: 0px-599px
// sm, small: 600px-899px
// md, medium: 900px +

export function Main() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <PersonalCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppDrawer title="Productivity">
          <App name="Mail" onClick={() => window.open("mailto:sivertutne@gmail.com")} />
          <App name="Github" onClick={() => window.open("https://github.com/sutne")} />
          <App name="Spotify" onClick={() => window.open("https://spotify-readme-sivertutne.vercel.app/api/spotify")} />
        </AppDrawer>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppDrawer title="Games">
          <App name="Playstation" onClick={() => window.open("https://card.psnprofiles.com/2/Sutne_.png")} />
          <App name="Minesweeper" onClick={() => window.open("https://sutne.github.io/games/#/Minesweeper")} />
        </AppDrawer>
      </Grid>
    </Grid>
  );
}