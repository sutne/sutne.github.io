import React from 'react';
import ReactDOM from 'react-dom/client';
import { alpha, Box } from '@mui/material';

import { Main } from 'pages/Main';
import { ThemeProvider, useTheme } from 'providers/theme-provider';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
document.body.style.margin = '0px';
document.body.style.padding = '0px';

root.render(
  <React.StrictMode>
    <ThemeProvider >
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
);

export function Root() {
  const { theme } = useTheme();

  const sx = getSx();
  return <Box sx={sx.root}>
    <Box sx={sx.content}>
      <Main />
    </Box>
  </Box>;

  function getSx() {
    return {
      root: [
        {
          width: '100vw',
          height: '100vh',
          overflow: 'auto',
          backgroundImage: `linear-gradient(70deg,  ${alpha(theme.palette.background.paper, 0.75)} 60%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }],
      content: [
        {
          width: 'min(1024px, 100%)',
          margin: '0 auto',
          height: '100%',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          fontSmoothing: 'antialiased',
          WebKitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      ],
    };
  }
}
