import React, { useEffect } from 'react';
import { VolumeMute, VolumeUp } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { ProgressBar } from '../components/progressbar';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import { TypeNowPlaying } from '../service/types';


export function NowPlaying(): JSX.Element {
  const [track, setTrack] = React.useState<TypeNowPlaying | undefined>();
  const { addSample, handlePlayPause, isPlaying } = useMusicPlayer();

  useEffect(() => {
    if (track) return;
    const getTrack = async () => {
      const response = await API.getNowPlaying();
      if (!response) return;
      setTrack(response);
      addSample(response.sample)
    }
    getTrack();
  }, [track])

  const classes = {
    container: [{
      position: "relative",
      borderRadius: "8px",
      overflow: "hidden",
      padding: "16px",
      bgcolor: "rgb(40,40,40)",
    }],
    cover: [{
      width: "min(50mm, 100%)",
      height: "min(50mm, 100%)",
      borderRadius: "8px",
    }],
    content: [{
      position: "relative",
      marginLeft: "16px",
      width: "100%",
      height: "fill-parent",
      textAlign: "center",
    }],
    info: [{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }],
    title: [{
      color: "rgba(255,255,255,0.9)",
      fontSize: "2.2em",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }],
    artists: [{
      color: "rgba(255,255,255,0.5)",
      fontSize: "1.4em",
      lineHeight: "1.6em",
      height: "3.2em",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }],
    progress: [{
      width: "100%",
      position: "absolute",
      bottom: "0",
      left: "0",
    }],
  }


  if (!track) return <></>
  return <>
    <SectionTitle title="Currently Listening To" />
    <Stack direction={{ xs: "column", sm: "row" }} sx={classes.container}>
      <Box component="img" src={track.art} sx={classes.cover} />
      <Stack direction="column" sx={classes.content}>
        <Box sx={classes.info}>
          <Typography sx={classes.title}>{track.title}</Typography>
          <Typography sx={classes.artists}>{track.artists.join(", ")}</Typography>
        </Box>
        <Stack sx={classes.progress} direction="row" spacing={1}>
          <ProgressBar
            length={track.length}
            progress={track.progress}
            onCompletion={() => { setTrack(undefined) }} />
          <IconButton onClick={() => handlePlayPause(track.sample)}>
            {isPlaying(track.sample) ? <VolumeUp /> : <VolumeMute />}
          </IconButton>
        </Stack>
      </Stack>
    </Stack >
  </>

}