
import React, { useEffect, useState } from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

import { msToString } from '../util';


type props = {
  length: number;
  progress: number;
  onCompletion?: () => void;
}
export function TimeDuration({ ...props }: props): JSX.Element {
  const [currentProgress, setProgress] = useState(props.progress);

  const { theme } = useTheme();

  let timer: NodeJS.Timer;
  useEffect(() => {
    timer = setInterval(() => {
      setProgress(prev => Math.min(props.length, prev + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentProgress < props.length) return;
    clearInterval(timer);
    props.onCompletion?.();
  }, [currentProgress]);

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

  const progress = Math.min(100, 100 * currentProgress / props.length);
  return <Stack direction='row' spacing={1} sx={classes.progress}>
    <Typography sx={classes.timeMarker}>{msToString(currentProgress)}</Typography>
    <LinearProgress sx={classes.bar} variant='determinate' value={progress} />
    <Typography sx={classes.timeMarker}>{msToString(props.length)}</Typography>
  </Stack>;
}