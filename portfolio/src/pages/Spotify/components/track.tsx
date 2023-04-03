import React, { useState } from 'react';
import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

import { useMusicPlayer } from '../providers/music-player';
import { TypeTrack } from '../service/types';


type props = {
  track: TypeTrack,
}
export function Track({ ...props }: props): JSX.Element {
  const { theme } = useTheme();
  const { handlePlayPause, isPlaying } = useMusicPlayer();
  const [songHovered, setSongHovered] = useState(false);

  const classes = {
    container: [{
      position: "relative",
      width: "36mm",
      textAlign: "left",
      borderRadius: "8px",
      padding: "16px",
      transition: "all 0.125s ease",
      bgcolor: "rgb(24,24,24)",
      "&:hover": {
        bgcolor: "background.paper",
      }
    }],
    cover: [{
      borderRadius: "8px",
      marginBottom: "0.6em",
    }],
    title: [{
      color: "text.primary",
      fontSize: "1.1em",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }],
    artists: [{
      color: "text.secondary",
      fontSize: "0.8em",
      lineHeight: "1.6em",
      height: "3.2em",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }],
    button: [{
      position: "absolute",
      right: "7mm",
      top: "28mm",
      height: "40px",
      width: "40px",
      transition: "all 0.3s ease-in-out",
      bgcolor: theme.palette.primary.main,
      opacity: songHovered || isPlaying(props.track.sample) ? "1" : "0",
      transform: songHovered || isPlaying(props.track.sample) ? "translate(0,0)" : "translate(0,3mm)",
      "&:hover": {
        bgcolor: theme.palette.primary.light,
        transform: "scale(1.05) ",
      }
    }],
    button_icon: {
      color: "rgb(24,24,24)",
      transition: "all 0.125s ease",
      fontSize: "1.3em",
    }
  }


  return <Stack direction="column" sx={classes.container}
    onMouseEnter={() => setSongHovered(true)}
    onMouseLeave={() => setSongHovered(false)}
  >
    <Box component="img" src={props.track.art} sx={classes.cover} />
    <Typography sx={classes.title}>{props.track.title}</Typography>
    <Typography sx={classes.artists}>{props.track.artists.join(", ")}</Typography>
    <IconButton sx={classes.button} onClick={() => handlePlayPause(props.track.sample)}>
      {isPlaying(props.track.sample) ? <Pause sx={classes.button_icon} /> : <PlayArrow sx={classes.button_icon} />}
    </IconButton>
  </Stack >
}