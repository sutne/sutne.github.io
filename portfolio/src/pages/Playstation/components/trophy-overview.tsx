import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { ProfileType, TrophyType } from '../service/types';
import { getTrophyLevelImage } from '../util';

export function TrophyOverview(props: { profile: ProfileType }) {
  const Trophy = ({ type }: { type: TrophyType }) => {
    const count = props.profile.trophySummary.earned[type];
    return (
      <Grid item xs={3} sm={2}>
        <TrophyCount type={type} count={count} />
      </Grid>
    );
  };

  return (
    <>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12} md={4}>
          <TrophyLevel level={props.profile.trophySummary.level} />
        </Grid>
        <Trophy type='platinum' />
        <Trophy type='gold' />
        <Trophy type='silver' />
        <Trophy type='bronze' />
      </Grid>
    </>
  );
}

export function TrophyCount(props: { type: TrophyType; count: number }) {
  const image = require(`../assets/trophies/${props.type}.png`);
  return <ImageWithText image={image} text={props.count} />;
}

export function TrophyLevel(props: { level: number }) {
  const icon = require(`../assets/levels/${getTrophyLevelImage(props.level)}`);
  return <ImageWithText image={icon} text={props.level} />;
}

function ImageWithText(props: { image: any; text: string | number }) {
  const sx = getSx();
  return (
    <Box sx={sx.container}>
      <Box component='img' sx={sx.image} src={props.image} />
      <Typography sx={sx.text}>{props.text}</Typography>
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
