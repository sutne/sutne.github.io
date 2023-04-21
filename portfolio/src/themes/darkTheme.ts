import { createTheme } from '@mui/material';

import { lightTheme } from './lightTheme';

export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(24,24,28)',
      paper: 'rgb(60,60,64)',
    },
    text: {
      primary: 'rgba(255,255,255,80%)',
      secondary: 'rgba(255,255,255,60%)',
    },
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
});
