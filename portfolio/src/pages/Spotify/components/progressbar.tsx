
import React, { useEffect, useState } from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

import { msToString } from '../util';


type props = {
  length: number;
  startedAt: number;
  onCompletion?: () => void;
}
export function TimeDuration({ ...props }: props): JSX.Element {
  // offset time a little to prevent website refresing to same song
  const getElapsed = () => Date.now() - 4000 - props.startedAt;

  const [elapsed, setElapsed] = useState(getElapsed());

  const { theme } = useTheme();

  let timer: NodeJS.Timer;
  useEffect(() => {
    timer = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (elapsed < props.length) return;
    setElapsed(props.length);
    clearInterval(timer);
    props.onCompletion?.();
  }, [elapsed]);

  const classes = {
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

  const progress = Math.min(100, 100 * elapsed / props.length);
  return <Stack direction='row' spacing={1} sx={classes.progress}>
    <Typography sx={classes.timeMarker}>{msToString(elapsed)}</Typography>
    <LinearProgress sx={classes.bar} variant='determinate' value={progress} />
    <Typography sx={classes.timeMarker}>{msToString(props.length)}</Typography>
  </Stack>;
}