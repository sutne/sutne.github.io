import { Box } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { AppContent } from 'components/app-content';
import { Route, Routes } from 'react-router-dom';
import { darkTheme } from 'themes/darkTheme';
import { lightTheme } from 'themes/lightTheme';
import { SortProvider } from '../../providers/sort-provider';
import { TrophyAdvisor } from './Main/AllTrophies/TrophyAdvisor/TrophyAdvisor';
import { TrophyLog } from './Main/AllTrophies/TrophyLog/TrophyLog';
import { PlaystationTrophyStats } from './Main/AllTrophies/TrophyStats/TrophyStats';
import { PlaystationTrophiesGame } from './Main/Game/PlaystationTrophiesGame';
import { Main } from './Main/Main';
import { SingleTrophy } from './Main/SingleTrophy/SingeTrophy';
import { PlaystationTrophies } from './Main/Trophies/Trophies';
import { SingleGameTrophiesProvider } from './contexts/SingleGameTrophies';
import { TrophiesProvider } from './contexts/Trophies';
import { TrophyGamesProvider } from './contexts/TrophyGames';

const playstationDarkTheme = responsiveFontSizes(
  createTheme(darkTheme, {
    palette: {
      primary: {
        main: 'rgb(30,215,96)',
        light: 'rgb(38,227,116)',
        dark: 'rgba(30,215,96,20%)',
      },
      background: {
        default: 'rgb(5, 6, 12)',
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
            path='/trophies/*'
            element={
              <TrophyGamesProvider>
                <TrophiesProvider>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <SortProvider
                          storageKey='playstation-game-sorting'
                          defaultSorting={{
                            type: 'Latest Trophy',
                            order: 'asc',
                          }}
                        >
                          <PlaystationTrophies />
                        </SortProvider>
                      }
                    />
                    <Route
                      path='/game/:gameIds/platform/:platforms/*'
                      element={
                        <SingleGameTrophiesProvider>
                          <Routes>
                            <Route
                              path='/'
                              element={<PlaystationTrophiesGame />}
                            />
                            <Route
                              path='/trophy/:trophyId'
                              element={<SingleTrophy />}
                            />
                            <Route path='/*' element={<>404</>} />
                          </Routes>
                        </SingleGameTrophiesProvider>
                      }
                    />
                    <Route path='/stats' element={<PlaystationTrophyStats />} />
                    <Route path='/log' element={<TrophyLog />} />
                    <Route path='/advisor' element={<TrophyAdvisor />} />
                    <Route path='/*' element={<>404</>} />
                  </Routes>
                </TrophiesProvider>
              </TrophyGamesProvider>
            }
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
