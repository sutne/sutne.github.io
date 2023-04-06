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
          width: '100%',
          height: '100%',
          overflow: 'auto',
          backgroundImage: `linear-gradient(90deg,  ${alpha(theme.palette.background.default, 1)} 0%, ${alpha(theme.palette.background.default, 0.95)} 50%, ${alpha(theme.palette.background.default, 1)} 100%)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }],
      content: [
        {
          width: 'min(1024px, 100%)',
          margin: '0 auto',
          height: '100vh',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          fontSmoothing: 'antialiased',
          WebKitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      ],
    };
  }
}
