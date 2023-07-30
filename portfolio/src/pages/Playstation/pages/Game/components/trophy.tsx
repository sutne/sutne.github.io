import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import type { Trophy } from '../../../service/types';
import { getDateString } from '../../../util';

export function Trophy(props: { trophy: Trophy }) {
  const hideDetails = props.trophy.isHidden && !props.trophy.isEarned;
  const trophyType = hideDetails ? 'hidden' : props.trophy.type;
  const trophyIcon = require(`../../../assets/trophies/${trophyType}.png`);

  const iconShadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 3px 6px rgba(0,0,0,50%))',
  };
  const trophyShadow = {
    xs: 'drop-shadow(0 1px 2px rgba(0,0,0,50%))',
    sm: 'drop-shadow(0 2px 3px rgba(0,0,0,50%))',
  };
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
          <Stack direction='row' sx={sx.stats}>
            <Box sx={sx.trophyIcon} component='img' src={trophyIcon} />
            <Typography sx={sx.rarity}>{props.trophy.rarity}%</Typography>
            {props.trophy.isEarned && (
              <>
                <Typography sx={sx.earnedTime}>
                  {getDateString(props.trophy.earnedAt)}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
  function getSx() {
    return {
      container: {
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: { xs: '8px', sm: '16px' },
        padding: { xs: '8px', sm: '16px' },
        boxSizing: 'border-box',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      icon: [
        {
          minWidth: { xs: '22mm', sm: '35mm' },
          maxWidth: { xs: '22mm', sm: '35mm' },
          aspectRatio: 1,
          alignSelf: 'center',
          objectFit: 'contain',
          borderRadius: { xs: '4px', sm: '8px' },
          filter: 'grayscale(100%)',
          WebkitFilter: 'grayscale(100%)',
          opacity: 0.075,
        },
        props.trophy.isEarned && {
          filter: iconShadow,
          WebkitFilter: iconShadow,
          opacity: 1,
        },
      ],
      info: {
        marginLeft: { xs: '8px', sm: '16px' },
        width: '100%',
        overflow: 'hidden',
      },
      title: {
        fontSize: { xs: '0.9rem', sm: '1.2rem' },
        color: 'text.primary',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      description: {
        fontSize: { xs: '0.7rem', sm: '1rem' },
        height: { xs: '2.2rem', sm: '3.4rem' },
        lineHeight: { xs: '1.1rem', sm: '1.7rem' },
        overflow: 'hidden',
        color: 'text.secondary',
      },
      stats: {
        // width: '100%',
      },
      trophyIcon: [
        {
          height: { xs: '1.5rem', sm: '2.5rem' },
          width: { xs: '1.5rem', sm: '2.5rem' },
          objectFit: 'contain',
          WebkitFilter: trophyShadow,
          filter: trophyShadow,
          opacity: 1,
        },
        !props.trophy.isEarned && {
          opacity: 0.2,
        },
      ],
      rarity: {
        fontSize: { xs: '0.7rem', sm: '1.2rem' },
        alignSelf: 'center',
        flexGrow: 1,
        color: 'text.secondary',
        fontWeight: 100,
      },
      earnedTime: {
        fontSize: { xs: '0.7rem', sm: '1rem' },
        alignSelf: 'center',
        color: 'text.secondary',
        fontWeight: 100,
      },
    };
  }
}
