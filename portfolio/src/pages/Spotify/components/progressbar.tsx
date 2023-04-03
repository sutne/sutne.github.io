
import React, { useEffect, useState } from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

import { isString, msToString } from '../util';


type props = {
  length: number | string;
  progress: number | string;
  onCompletion?: () => void;
}
export function ProgressBar({ ...props }: props): JSX.Element {
  const { theme } = useTheme();
  const length: number = isString(props.length) ? parseFloat(props.length) : props.length;
  const startProgress: number = isString(props.progress) ? parseFloat(props.progress) : props.progress;
  const [progress_ms, setProgressMs] = useState(startProgress - (startProgress % 1000));

  let timer: NodeJS.Timer;
  useEffect(() => {
    timer = setInterval(() => {
      setProgressMs(prev => Math.min(length, prev + 1000));
    }, 1000);
    return () => clearInterval(timer)
  }, []);

  useEffect(() => {
    if (progress_ms < length) return;
    clearInterval(timer);
    props.onCompletion?.();
  }, [progress_ms])

  const classes = {
    progress: [{
      width: "100%",
    }],
    timeMarker: [{
      fontSize: "0.8em",
      alignSelf: "center",
      color: theme.palette.text.primary,
    }],
    bar: [{
      alignSelf: "center",
      height: "0.4em",
      borderRadius: "0.5em",
      backgroundColor: theme.palette.primary.dark,
      "& .MuiLinearProgress-bar": {
        transition: "all 0.05s ease",
        backgroundColor: theme.palette.primary.main,
        // backgroundColor: theme.palette.background.default,
      },
      width: "100%",
    }]
  }

  const progress = Math.min(100, 100 * progress_ms / length);
  return <Stack direction="row" spacing={1} sx={classes.progress}>
    <Typography sx={classes.timeMarker}>{msToString(progress_ms)}</Typography>
    <LinearProgress sx={classes.bar} variant="determinate" value={progress} />
    <Typography sx={classes.timeMarker}>{msToString(length)}</Typography>
  </Stack>
}