import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { TypeArtist } from '../service/types';

type props = {
  artist: TypeArtist,
}
export function Artist({ ...props }: props) {
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
    image: [{
      borderRadius: "8px",
      marginBottom: "0.6em",
    }],
    name: [{
      color: "text.primary",
      fontSize: "1.1em",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }],
    genres: [{
      color: "text.secondary",
      fontSize: "0.8em",
      lineHeight: "1.6em",
      height: "3.2em",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }],
  }

  return <Stack direction="column" sx={classes.container}>
    <Box component="img" src={props.artist.image} sx={classes.image} />
    <Typography sx={classes.name}>{props.artist.name}</Typography>
    <Typography sx={classes.genres}>{props.artist.genres.join(", ")}</Typography>
  </Stack >
}