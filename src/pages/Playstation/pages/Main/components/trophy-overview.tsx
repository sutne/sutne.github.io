import { Box, Grid, alpha, useTheme } from '@mui/material';
import { Shimmer } from 'components/animated/shimmer';
import { useNavigate } from 'react-router-dom';
import { TrophyWithCount } from '../../../components/trophy-with-count';
import type { Profile, TrophyType } from '../../../service/types';
import { TrophyLevel } from './trophy-level';

export function TrophyOverview(props: { profile: Profile }) {
  const navigate = useNavigate();
  const sx = getSx();

  const trophy = (type: TrophyType) => {
    return (
      <Grid key={type} item xs={3} sm={2}>
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
        <Grid item xs={12} md={4}>
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
  return (
    <Box sx={{ ...sx.card, padding: 0, height: '212px', cursor: 'default' }}>
      <Shimmer />
    </Box>
  );
}

function getSx() {
  const theme = useTheme();
  return {
    card: {
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
