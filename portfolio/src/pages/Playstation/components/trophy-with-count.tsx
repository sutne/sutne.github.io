import React from 'react';
import { Box, Typography } from '@mui/material';

import type { TrophyType } from '../service/types';

export function TrophyWithCount(props: {
  type: TrophyType;
  count: number;
  hideZero?: boolean;
  hide?: boolean;
}) {
  const image = require(`../assets/trophies/${props.type}.png`);

  const hide = props.hideZero && props.count == 0;
  const hideText =
    props.hideZero && (props.type == 'platinum' || props.count == 0);

  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box component='img' sx={sx.image} src={image} />
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
      image: {
        width: '100%',
        maxWidth: { xs: '80px', sm: '120px' },
      },
      text: {
        opacity: hideText ? 0 : 1,
        position: 'relative',
        top: { xs: '0', sm: '-10px' },
        textAlign: 'center',
        fontWeight: 200,
        fontSize: { xs: '14px', sm: '18px', md: '24px' },
      },
    };
  }
}
