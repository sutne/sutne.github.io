import React from 'react';
import { Box, Typography } from '@mui/material';

import { getTrophyLevelImage } from '../../../util';

export function TrophyLevel(props: { level: number }) {
  const icon = require(`../../../assets/levels/${getTrophyLevelImage(
    props.level,
  )}`);
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box sx={sx.image} component='img' src={icon} />
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
        filter: 'drop-shadow(0 3px 5px rgba(0,0,0,50%))',
        WebkitFilter: 'drop-shadow(0 3px 5px rgba(0,0,0,50%))',
      },
      text: {
        position: 'relative',
        top: { xs: '0', sm: '-10px' },
        textAlign: 'center',
        fontWeight: 300,
        fontSize: { xs: '10px', sm: '18px', md: '24px' },
      },
    };
  }
}
