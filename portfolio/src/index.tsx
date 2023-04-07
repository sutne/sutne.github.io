import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box } from '@mui/material';

import { Main } from 'pages/Main';
import { ThemeProvider, useTheme } from 'providers/theme-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
document.body.style.margin = '0px';
document.body.style.padding = '0px';

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
);

export function Root() {
  const { themeIsDark } = useTheme();

  const sx = getSx();
  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <Main />
      </Box>
    </Box>
  );

  function getSx() {
    return {
      root: [
        {
          width: '100%',
          height: '100%',
          overflow: 'auto',
          background: `linear-gradient(90deg,  
            ${themeIsDark ? 'rgb(18,18,18)' : 'rgb(210,210,210)'} 0%, 
            ${themeIsDark ? 'rgb(24,24,24)' : 'rgb(230,230,235)'} 50%, 
            ${themeIsDark ? 'rgb(17,19,24)' : 'rgb(210,210,210)'} 100%)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
      ],
      content: [
        {
          width: 'min(1024px, 100%)',
          margin: '0 auto',
          height: '100vh',
          fontFamily: `
            -apple-system, 
            BlinkMacSystemFont, 
            'Segoe UI', 
            'Roboto', 
            'Oxygen',
            'Ubuntu', 
            'Cantarell', 
            'Fira Sans', 
            'Droid Sans', 
            'Helvetica Neue', 
            sans-serif
          `,
          fontSmoothing: 'antialiased',
          WebKitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          padding: '8px',
          boxSizing: 'border-box',
          '&:after': {
            content: '""',
            display: 'block',
            height: '16px',
            width: '100%',
          },
        },
      ],
    };
  }
}
