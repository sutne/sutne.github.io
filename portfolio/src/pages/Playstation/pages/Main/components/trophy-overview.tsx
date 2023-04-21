import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import { TrophyWithCount } from '../../../components/trophy-with-count';
import { Profile, TrophyType } from '../../../service/types';
import { TrophyLevel } from './trophy-level';

export function TrophyOverview(props: { profile: Profile }) {
  const Trophy = ({ type }: { type: TrophyType }) => {
    const count = props.profile.trophySummary.earned[type];
    return (
      <Grid item xs={3} sm={2}>
        <TrophyWithCount type={type} count={count} />
      </Grid>
    );
  };

  const navigate = useNavigate();
  const sx = getSx();
  return (
    <Box sx={sx.card} onClick={() => navigate(`/Playstation/trophies`)}>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12} md={4}>
          <TrophyLevel level={props.profile.trophySummary.level} />
        </Grid>
        <Trophy type='platinum' />
        <Trophy type='gold' />
        <Trophy type='silver' />
        <Trophy type='bronze' />
      </Grid>
    </Box>
  );

  function getSx() {
    return {
      card: {
        cursor: 'pointer',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
        padding: '24px',
      },
    };
  }
}
