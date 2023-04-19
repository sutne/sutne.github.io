import React from 'react';
import { Box, Typography } from '@mui/material';

import { getTrophyLevelImage } from '../util';

export function TrophyLevel(props: { level: number }) {
  const icon = require(`../assets/levels/${getTrophyLevelImage(props.level)}`);
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box component='img' sx={sx.image} src={icon} />
      <Typography sx={sx.text}>Level {props.level}</Typography>
    </Box>
  );

  function getSx() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        maxWidth: { xs: '80px', sm: '120px' },
      },
      text: {
        position: 'relative',
        top: { xs: '0', sm: '-10px' },
        textAlign: 'center',
        fontWeight: 400,
        fontSize: { xs: '16px', sm: '22px', md: '32px' },
      },
    };
  }
}
