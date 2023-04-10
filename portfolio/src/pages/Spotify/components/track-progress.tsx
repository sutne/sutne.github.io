import React, { useEffect, useState } from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';

import { useApp } from 'providers/app-provider';

import { useNowPlaying } from '../providers/now-playing-provider';
import { msToString } from '../util';

export function TrackProgress() {
  const { theme } = useApp();
  const { track, refresh, setShouldShow } = useNowPlaying();
  if (!track) return <></>;

  const [elapsed, setElapsed] = useState(0);

  let timer: NodeJS.Timer;
  useEffect(() => {
    if (!track) return;
    setElapsed(Math.max(track.elapsed - 1000, 0));

    timer = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 1000, track.length));
    }, 1000);

    return () => clearInterval(timer);
  }, [track]);

  useEffect(() => {
    if (!track) return;
    const remaining = track.length - elapsed;
    if (remaining > 2000) return;
    if (remaining > 0) {
      setShouldShow(false);
      return;
    }
    if (remaining <= 0) {
      clearInterval(timer);
      refresh();
    }
  }, [elapsed]);

  const progress = Math.min(100, (100 * elapsed) / track.length);

  const sx = getSx();
  return (
    <Stack direction='row' spacing={1} sx={sx.progress}>
      <Typography sx={sx.timeMarker}>{msToString(elapsed)}</Typography>
      <LinearProgress sx={sx.bar} variant='determinate' value={progress} />
      <Typography sx={sx.timeMarker}>{msToString(track.length)}</Typography>
    </Stack>
  );

  function getSx() {
    return {
      progress: [
        {
          width: '100%',
        },
      ],
      timeMarker: [
        {
          fontSize: '0.8em',
          alignSelf: 'center',
          color: theme.palette.text.primary,
        },
      ],
      bar: [
        {
          alignSelf: 'center',
          height: '0.4em',
          borderRadius: '0.5em',
          backgroundColor: theme.palette.primary.dark,
          '& .MuiLinearProgress-bar': {
            transition: 'all 0s',
            backgroundColor: theme.palette.primary.main,
            borderRight: `1px solid ${theme.palette.primary.light}`,
          },
          width: '100%',
        },
      ],
    };
  }
}
