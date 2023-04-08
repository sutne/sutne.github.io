import React from 'react';
import { Box } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { App } from 'components/app';
import { darkTheme } from 'providers/darkTheme';

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
        default: 'rgb(14,14,14)',
        paper: 'rgb(40,40,40)',
      },
      text: {
        primary: 'rgba(255,255,255,90%)',
        secondary: 'rgba(255,255,255,40%)',
      },
    },
  }),
);

export function Playstation() {
  return (
    <App name='Playstation' theme={playstationTheme}>
      <Box style={{ padding: '24px' }}>
        <Box
          style={{ borderRadius: '8px' }}
          component='img'
          src='https://card.psnprofiles.com/1/Sutne_.png'
        />
      </Box>
    </App>
  );
}
