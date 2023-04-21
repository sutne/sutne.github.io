import { createTheme, responsiveFontSizes } from '@mui/material';

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      background: {
        default: 'rgb(230,230,230)',
        paper: 'rgb(255,255,255)',
      },
      text: {
        primary: 'rgba(0,0,0,80%)',
        secondary: 'rgba(0,0,0,60%)',
      },
    },
    shadows: [
      'none',
      '0 0 5px rgba(0,0,0,1)',
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
    typography: {
      fontSize: 14,
      h1: {
        fontSize: '5rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0',
      },
      h2: {
        fontSize: '4rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0',
      },
      h3: {
        fontSize: '3rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0',
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0',
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0',
      },
    },
  }),
);
