import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { App } from 'components/app';
import { darkTheme } from 'providers/darkTheme';
import { lightTheme } from 'providers/lightTheme';
import { useTheme } from 'providers/theme-provider';

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
    },
  }),
);

export function GitHub() {
  const { themeIsDark } = useTheme();

  const [theme, setTheme] = useState(
    themeIsDark ? githubDarkTheme : githubLightTheme,
  );

  useEffect(() => {
    console.log({ themeIsDark });
    setTheme(themeIsDark ? githubDarkTheme : githubLightTheme);
  }, [themeIsDark]);

  return (
    <App name='GitHub' theme={theme} appBarColor={theme.palette.primary.main}>
      <Box style={{ padding: '24px' }}>
        <RepoList />
      </Box>
    </App>
  );
}
