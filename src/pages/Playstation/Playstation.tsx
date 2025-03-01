import { Box } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { AppContent } from 'components/app-content';
import { Route, Routes } from 'react-router-dom';
import { darkTheme } from 'themes/darkTheme';
import { lightTheme } from 'themes/lightTheme';
import { SortProvider } from '../../providers/sort-provider';
import { PlaystationTrophiesGame } from './pages/Game/TrophiesForGame';
import { Main } from './pages/Main/Main';
import { PlaystationTrophies } from './pages/Trophies/Trophies';

const playstationDarkTheme = responsiveFontSizes(
  createTheme(darkTheme, {
    palette: {
      primary: {
        main: 'rgb(30,215,96)',
        light: 'rgb(38,227,116)',
        dark: 'rgba(30,215,96,20%)',
      },
      background: {
        default: 'rgb(5,6,12)',
        paper: 'rgb(24, 27, 36)',
      },
      text: {
        primary: 'rgba(255,255,255,90%)',
        secondary: 'rgba(255,255,255,40%)',
      },
    },
  }),
);

const playstationLightTheme = responsiveFontSizes(
  createTheme(lightTheme, {
    palette: {},
  }),
);

export function Playstation() {
  const sx = getSx();
  return (
    <AppContent
      name='Playstation'
      darkTheme={playstationDarkTheme}
      lightTheme={playstationLightTheme}
      fillWidth
    >
      <Box sx={sx.container}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/trophies'
            element={
              <SortProvider
                defaultSorting={{ type: 'Latest Trophy', order: 'asc' }}
              >
                <PlaystationTrophies />
              </SortProvider>
            }
          />
          <Route
            path='/trophies/game/:gameIds/platform/:platforms'
            element={<PlaystationTrophiesGame />}
          />
          <Route path='/*' element={<>404</>} />
        </Routes>
      </Box>
    </AppContent>
  );
  function getSx() {
    return {
      container: {
        padding: { xs: '8px', sm: '24px' },
        width: '100%',
        boxSizing: 'border-box',
      },
    };
  }
}
