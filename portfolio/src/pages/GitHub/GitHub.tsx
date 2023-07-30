import React from 'react';
import { Box, Typography } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { AppContent } from 'components/app-content';
import { SortProvider } from 'providers/sort-provider';
import { darkTheme } from 'themes/darkTheme';
import { lightTheme } from 'themes/lightTheme';

import { LanguagesCard } from './components/languages-card';
import { RepoList } from './components/repo-list';

const githubLightTheme = responsiveFontSizes(
  createTheme(lightTheme, {
    palette: {
      mode: 'light',
      primary: {
        main: 'rgb(36,41,47)',
      },
      background: {
        default: 'rgb(246,248,250)',
        paper: 'rgb(255,255,255)',
      },
      text: {
        primary: 'rgb(31,35,40)',
        secondary: 'rgb(101,109,118)',
      },
      error: {
        main: 'rgb(190,50,50)',
      },
    },
  }),
);

const githubDarkTheme = responsiveFontSizes(
  createTheme(darkTheme, {
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgb(36,41,47)',
      },
      background: {
        default: 'rgb(1,4,9)',
        paper: 'rgb(13,17,23)',
      },
      text: {
        primary: 'rgb(230,237,243)',
        secondary: 'rgba(125,133,144)',
      },
      error: {
        main: 'rgb(130,30,30)',
      },
    },
  }),
);

export function GitHub() {
  return (
    <AppContent
      name='GitHub'
      lightTheme={githubLightTheme}
      darkTheme={githubDarkTheme}
      appBarTheme={{
        background: `linear-gradient(180deg, 
          rgb(35,40,45) 0%,
          rgb(16,20,25) 100%
        )`,
        textColor: githubDarkTheme.palette.text.primary,
      }}
      fillWidth
    >
      <Box style={{ padding: '24px' }}>
        <LanguagesCard />
        <Typography variant='h3' sx={{ margin: '12mm 0 6mm 0' }}>
          My Repositories
        </Typography>
        <SortProvider defaultSorting={{ type: 'Updated', order: 'asc' }}>
          <RepoList />
        </SortProvider>
      </Box>
    </AppContent>
  );
}
