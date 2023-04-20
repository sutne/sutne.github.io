import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import type { Trophy } from '../../../service/types';
import { getDateString } from '../../../util';

export function Trophy(props: { trophy: Trophy }) {
  const hideDetails = props.trophy.isHidden && !props.trophy.isEarned;
  const trophyType = hideDetails ? 'hidden' : props.trophy.type;
  const trophyIcon = require(`../../../assets/trophies/${trophyType}.png`);

  const sx = getSx();
  return (
    <>
      <Stack sx={sx.container} direction='row'>
        <Box sx={sx.icon} component='img' src={props.trophy.icon} />
        <Stack sx={sx.info}>
          <Typography sx={sx.title}>
            {hideDetails ? 'Hidden' : props.trophy.title}
          </Typography>
          <Typography sx={sx.description}>
            {hideDetails ? 'Description is hidden.' : props.trophy.description}
          </Typography>
          <Box sx={sx.stats}>
            <Box sx={sx.trophyIcon} component='img' src={trophyIcon} />
            <Typography sx={sx.rarity}>{props.trophy.rarity}%</Typography>
            {props.trophy.isEarned && (
              <>
                <Typography sx={sx.earnedTime}>
                  {getDateString(props.trophy.earnedAt)}
                </Typography>
              </>
            )}
          </Box>
        </Stack>
      </Stack>
    </>
  );
  function getSx() {
    const height = { xs: '22mm', sm: '35mm' };
    return {
      container: {
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        padding: { xs: '8px', sm: '16px' },
        borderRadius: { xs: '8px', sm: '16px' },
        boxSizing: 'border-box',
      },
      icon: {
        height: height,
        width: height,
        objectFit: 'contain',
        borderRadius: '5%',
        marginRight: '16px',
        filter: props.trophy.isEarned ? 'none' : 'grayscale(100%)',
        opacity: props.trophy.isEarned ? 1 : 0.1,
      },
      info: {
        width: '100%',
      },
      title: {
        fontSize: { xs: '0.9rem', sm: '1.2rem' },
        color: 'text.primary',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        TextOverflow: 'ellipsis',
      },
      description: {
        fontSize: { xs: '0.7rem', sm: '1rem' },
        color: 'text.secondary',
        overflow: 'hidden',
        height: { xs: '2.2rem', sm: '3.4rem' },
        lineHeight: { xs: '1.1rem', sm: '1.7rem' },
      },
      trophyIcon: {
        height: { xs: '1.5rem', sm: '2.5rem' },
        width: { xs: '1.5rem', sm: '2.5rem' },
        objectFit: 'contain',
      },
      rarity: {
        alignSelf: 'center',
        flexGrow: 1,
        fontSize: { xs: '0.7rem', sm: '1.2rem' },
        color: 'text.secondary',
        fontWeight: 300,
      },
      earnedTime: {
        alignSelf: 'center',
        fontSize: { xs: '0.7rem', sm: '1rem' },
        color: 'text.secondary',
        fontWeight: 100,
      },
      stats: {
        display: 'flex',
        flexDirection: 'row',
      },
    };
  }
}
