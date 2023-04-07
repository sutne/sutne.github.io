import { createTheme } from '@mui/material';

import { lightTheme } from './lightTheme';

export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(40,40,40)',
      paper: 'rgb(80,80,80)',
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
