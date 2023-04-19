import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import { GitHub } from 'pages/GitHub/GitHub';
import { Main } from 'pages/Main/Main';
import { Playstation } from 'pages/Playstation/Playstation';
import { Settings } from 'pages/Settings/Settings';
import { Spotify } from 'pages/Spotify/Spotify';
import { AppProvider } from 'providers/app-provider';
import { MainThemeProvider, useMainTheme } from 'providers/main-theme-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
document.body.style.margin = '0px';
document.body.style.padding = '0px';

root.render(
  <React.StrictMode>
    <MainThemeProvider>
      <Root />
    </MainThemeProvider>
  </React.StrictMode>,
);

export function Root() {
  const { themeIsDark } = useMainTheme();

  const sx = getSx();
  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <AppProvider>
          <HashRouter>
            <Routes>
              <Route path='/' element={<Main />}>
                <Route path='Settings' element={<Settings />} />
                <Route path='Spotify' element={<Spotify />} />
                <Route path='GitHub' element={<GitHub />} />
                <Route path='Playstation/*' element={<Playstation />} />
              </Route>
              <Route path='*' element={<>404</>} />
            </Routes>
          </HashRouter>
        </AppProvider>
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
