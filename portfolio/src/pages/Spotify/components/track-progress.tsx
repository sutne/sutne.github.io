
import React, { useEffect, useState } from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

import { useNowPlaying } from '../providers/now-playing-provider';
import { msToString } from '../util';


export function TrackProgress() {

  const { track, refresh, setShouldShow } = useNowPlaying();
  if (!track) return <></>;

  // offset time a little to prevent website refresing to same song
  // this is due to the API not actually giving a proper timestamp and progress
  // https://stackoverflow.com/questions/59029450/how-to-synchronize-clock-with-spotify-servers
  const getElapsed = () => Math.max(0, Date.now() - (track.startedAt + 10_000));

  const [elapsed, setElapsed] = useState(getElapsed());

  const { theme } = useTheme();

  useEffect(() => {
    if (!track) return;
    const timer = setInterval(() => {
      const newElapsed = getElapsed();
      if (newElapsed < track.length) {
        const timeLeft = track.length - newElapsed;
        if (timeLeft < 2000) setShouldShow(false);
        setElapsed(newElapsed);
      } else {
        clearInterval(timer);
        refresh();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [track]);

  const progress = Math.min(100, 100 * elapsed / track.length);

  const sx = getSx();
  return <Stack direction='row' spacing={1} sx={sx.progress}>
    <Typography sx={sx.timeMarker}>{msToString(elapsed)}</Typography>
    <LinearProgress sx={sx.bar} variant='determinate' value={progress} />
    <Typography sx={sx.timeMarker}>{msToString(track.length)}</Typography>
  </Stack>;

  function getSx() {
    return {
      progress: [{
        width: '100%',
      }],
      timeMarker: [{
        fontSize: '0.8em',
        alignSelf: 'center',
        color: theme.palette.text.primary,
      }],
      bar: [{
        alignSelf: 'center',
        height: '0.4em',
        borderRadius: '0.5em',
        backgroundColor: theme.palette.primary.dark,
        '& .MuiLinearProgress-bar': {
          transition: 'all 0.05s ease',
          backgroundColor: theme.palette.primary.main,
        },
        width: '100%',
      }],
    };
  }
}