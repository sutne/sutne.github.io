import React from 'react';
import { Box } from '@mui/material';
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { App } from 'components/app';
import { ThemeProvider } from 'providers/theme-provider';

import { MusicPlayerProvider } from './providers/music-player';
import { NowPlaying } from './sections/NowPlaying';
import { RecentlyPlayed } from './sections/RecentlyPlayed';
import { TopArtists } from './sections/TopArtists';
import { TopTracks } from './sections/TopTracks';

const spotifyTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "rgb(30,215,96)",
        light: "rgb(35,227,107)",
        dark: "rgba(30,215,96,20%)",
      },
      background: {
        default: "rgb(14,14,14)",
        paper: "rgb(40,40,40)",
      },
      text: {
        primary: "rgba(255,255,255,90%)",
        secondary: "rgba(255,255,255,50%)",
      },
    },
  })
);

export function Spotify() {
  return <ThemeProvider theme={spotifyTheme}>
    <App name="Spotify">
      <MusicPlayerProvider>
        <Box marginTop="-2em">
          <NowPlaying />
          <RecentlyPlayed />
          <TopTracks />
          <TopArtists />
        </Box>
      </MusicPlayerProvider>
    </App>
  </ThemeProvider>
}