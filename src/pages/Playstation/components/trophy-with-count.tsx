import React from 'react';
import { Box, Typography } from '@mui/material';

import type { TrophyType } from '../service/types';

export function TrophyWithCount(props: {
  type: TrophyType;
  count: number;
  hideZero?: boolean;
  hide?: boolean;
  fontSize?: any;
  maxWidth?: string;
}) {
  const image = require(`../assets/trophies/${props.type}.png`);
  const hide = props.hideZero && props.count === 0;
  const hideText =
    props.hideZero && (props.type === 'platinum' || props.count === 0);

  const shadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 3px 5px rgba(0,0,0,50%))',
  };
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box sx={sx.image} component='img' src={image} />
      <Typography sx={sx.text}>{props.count}</Typography>
    </Box>
  );

  function getSx() {
    return {
      container: {
        opacity: props.hide ? 0 : hide ? 0.2 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: [
        {
          width: '100%',
          maxWidth: props.maxWidth ?? '80px',
        },
        !hide && {
          WebkitFilter: shadow,
          filter: shadow,
        },
      ],
      text: {
        opacity: hideText ? 0 : 1,
        position: 'relative',
        top: { xs: '0', sm: '-10px' },
        textAlign: 'center',
        fontWeight: 300,
        fontSize: props.fontSize ?? { xs: '10px', sm: '18px', md: '24px' },
      },
    };
  }
}
