import React from 'react';
import { Box } from '@mui/material';

import { RecentGame } from '../../../service/types';

export function GameCard(props: { game: RecentGame }) {
  const sx = getSx();
  return <Box sx={sx.image} component='img' src={props.game.image}></Box>;

  function getSx() {
    return {
      image: [
        {
          width: '100%',
          aspectRatio: 1,
          borderRadius: '7%',
          boxShadow: '0px 0px 4px 4px rgba(255,255,255,0.03)',
        },
      ],
    };
  }
}
