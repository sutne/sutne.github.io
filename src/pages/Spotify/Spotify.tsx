import { Box } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { AppContent } from 'components/app-content';
import { MusicPlayerProvider } from './providers/music-player';
import { NowPlayingProvider } from './providers/now-playing-provider';
import { NowPlaying } from './sections/NowPlaying';
import { RecentlyPlayed } from './sections/RecentlyPlayed';
import { TopArtists } from './sections/TopArtists';
import { TopTracks } from './sections/TopTracks';

const spotifyTheme = responsiveFontSizes(
  createTheme({
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

export function Spotify() {
  return (
    <AppContent name='Spotify' theme={spotifyTheme} hideOverflow>
      <Box style={{ padding: '24px' }}>
        <MusicPlayerProvider>
          {/* Remove margin from top header, regardless of which is on top */}
          <Box marginTop='-2em'>
            <NowPlayingProvider>
              <>
                <NowPlaying />
                <RecentlyPlayed />
              </>
            </NowPlayingProvider>
            <TopTracks />
            <TopArtists />
          </Box>
        </MusicPlayerProvider>
      </Box>
    </AppContent>
  );
}
