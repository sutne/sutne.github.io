import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { App } from 'components/app';
import { darkTheme } from 'providers/darkTheme';

import { ProfileOverview } from './components/profile-overview';
import { RecentlyPlayed } from './components/recently-played';
import { Section } from './components/section';
import { TrophyOverview } from './components/trophy-overview';
import * as API from './service/api';
import { ProfileType } from './service/types';

const playstationTheme = responsiveFontSizes(
  createTheme(darkTheme, {
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgb(30,215,96)',
        light: 'rgb(38,227,116)',
        dark: 'rgba(30,215,96,20%)',
      },
      background: {
        default: 'rgb(5,6,12)',
        paper: 'rgb(12,14,19)',
      },
      text: {
        primary: 'rgba(255,255,255,90%)',
        secondary: 'rgba(255,255,255,40%)',
      },
    },
  }),
);

export function Playstation() {
  const [profile, setProfile] = useState<ProfileType | undefined>();

  useEffect(() => {
    const getData = async () => {
      const response = await API.getProfile();
      if (!response) return;
      setProfile(response);
    };
    getData();
  }, []);

  const tokenExpired = new Date().valueOf() > new Date('31-5-2023').valueOf();
  return (
    <App name='Playstation' theme={playstationTheme}>
      {!profile || tokenExpired ? (
        <Box
          style={{ maxWidth: '100%' }}
          component='img'
          src='https://card.psnprofiles.com/1/Sutne_.png'
        />
      ) : (
        <Box sx={{ padding: '24px' }}>
          <ProfileOverview profile={profile} />
          <Section title='Trophies'>
            <TrophyOverview profile={profile} />
          </Section>
          <Section title='Recently Played' padding='8px'>
            <RecentlyPlayed />
          </Section>
        </Box>
      )}
    </App>
  );
}
