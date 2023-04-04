import React, { useEffect, useState } from 'react';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { Box, collapseClasses, Grow, IconButton, Stack, Typography } from '@mui/material';

import { TimeDuration } from '../components/progressbar';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import { TypeNowPlaying } from '../service/types';


export function NowPlaying(): JSX.Element {
  // State
  const [track, setTrack] = useState<TypeNowPlaying | undefined>();
  const [isHovering, setIsHovering] = useState(false);

  // Providers
  const { addSample, handlePlayPause, isPlaying } = useMusicPlayer();

  // Effects
  useEffect(() => {
    if (track) return;
    const getTrack = async () => {
      const response = await API.getNowPlaying();
      if (!response) return;
      setTrack(response);
      addSample(response.sample);
    };
    getTrack();
  }, [track]);

  // Helpers
  const showButton = () => isHovering || (track && isPlaying(track.sample));

  // Structure
  const classes = getClasses();
  return <Grow in={false} timeout={400}>
    {track ?
      <>
        <SectionTitle title="Currently Listening To" />
        <Stack direction={{ xs: "column", sm: "row" }} alignContent="stretch" sx={classes.container}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Box sx={classes.cover_box}>
            <Box component="img" src={track.art} sx={classes.cover} />
            <IconButton sx={classes.button} onClick={() => handlePlayPause(track.sample)}>
              {isPlaying(track.sample) ? <VolumeUp sx={classes.buttonIcon} /> : <VolumeOff sx={classes.buttonIcon} />}
            </IconButton>
          </Box>
          <Stack direction="column" sx={classes.content}>
            <Box sx={classes.info}>
              <Typography sx={classes.title}>{track.title}</Typography>
              <Typography sx={classes.artists}>{track.artists.join(", ")}</Typography>
              <Box sx={classes.progress}>
                <TimeDuration
                  length={track.length}
                  progress={track.progress}
                  onCompletion={() => { setTrack(undefined); }}
                />
              </Box>
            </Box>
          </Stack>
        </Stack >
      </> : <></>
    }
  </Grow>;

  // Style
  function getClasses() {
    return {
      container: [{
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        bgcolor: "background.paper",
      }],
      cover_box: [{
        position: "relative",
      }],
      cover: [{
        width: "50mm",
        borderRadius: "8px",
        aspectRatio: "1",
        objectFit: "cover",
      }],
      button: [{
        position: "absolute",
        right: "5mm",
        bottom: "5mm",
        height: "52px",
        width: "52px",
        transition: "all 0.3s ease-in-out",
        bgcolor: "primary.main",
        color: "background.paper",
        opacity: showButton() ? "1" : "0",
        transform: showButton() ? "translate(0,0)" : "translate(0,3mm)",
        "&:hover": {
          bgcolor: "primary.light",
        },
      }],
      buttonIcon: {
        color: "rgb(24,24,24)",
        transition: "all 0.125s ease",
        fontSize: "1.3em",
      },
      content: [{
        position: "relative",
        width: "100%",
        padding: { xs: "0 0 0 0", sm: "0 0 0 16px" },
        display: "table",
      }],
      info: [{
        display: "table-cell",
        maxWidth: "0px",
        verticalAlign: "middle",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        height: { xs: "6em", sm: "100%" },
      }],
      title: [{
        color: "text.primary",
        width: "100%",
        fontSize: { xs: "1.2em", sm: "1.8em" },
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }],
      artists: [{
        color: "text.secondary",
        fontSize: { xs: "0.9em", sm: "1.2em" },
        lineHeight: { xs: "0.9em", sm: "1.2em" },
        height: { xs: "1.8em", sm: "2.4em" },
        overflow: "hidden",
        margin: "0 30px",
      }],
      progress: [{
        position: "absolute",
        width: "100%",
        bottom: "0",
        left: "0",
      }],
    };
  }
}