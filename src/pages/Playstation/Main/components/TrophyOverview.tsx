import { alpha, Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Shimmer } from '../../../../components/animated/shimmer';
import {
  TrophyWithCount,
  TrophyWithCountShimmer,
} from '../../components/TrophyWithCount';
import type { Profile, TrophyType } from '../../service/types';
import { TrophyLevel } from './TrophyLevel';

export function TrophyOverview(props: { profile: Profile }) {
  const navigate = useNavigate();
  const sx = getSx();

  const trophy = (type: TrophyType) => {
    return (
      <Grid key={type} size={{ xs: 3, sm: 2 }}>
        <TrophyWithCount
          type={type}
          count={props.profile?.trophySummary.earned[type] ?? 0}
          fontSize={{ xs: '14px', sm: '18px', md: '24px' }}
          maxWidth='120px'
        />
      </Grid>
    );
  };

  return (
    <Box sx={sx.card} onClick={() => navigate('/Playstation/trophies')}>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid size={{ xs: 12, md: 4 }}>
          <TrophyLevel level={props.profile?.trophySummary.level ?? 1} />
        </Grid>
        {[
          trophy('platinum'),
          trophy('gold'),
          trophy('silver'),
          trophy('bronze'),
        ]}
      </Grid>
    </Box>
  );
}

export function TrophyOverviewShimmer() {
  const sx = getSx();

  const trophy = (type: TrophyType) => {
    return (
      <Grid key={type} size={{ xs: 3, sm: 2 }}>
        <TrophyWithCountShimmer
          type={type}
          fontSize={{ xs: '14px', sm: '18px', md: '24px' }}
          maxWidth='120px'
        />
      </Grid>
    );
  };
  return (
    <Box sx={{ ...sx.card, cursor: 'default' }}>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid size={{ xs: 12, md: 4 }} sx={{ opacity: 0 }}>
          <TrophyLevel level={0} />
        </Grid>
        {[
          trophy('platinum'),
          trophy('gold'),
          trophy('silver'),
          trophy('bronze'),
        ]}
      </Grid>
      <Shimmer
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}

function getSx() {
  const theme = useTheme();
  return {
    card: {
      position: 'relative',
      cursor: 'pointer',
      background: `linear-gradient(0deg,
                ${theme.palette.background.paper} 0%,
                ${alpha(theme.palette.background.paper, 0.4)} 100%
              )`,
      borderRadius: '16px',
      boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
      padding: '24px',
      overflow: 'hidden',
      minHeight: '164px',
    },
  };
}
