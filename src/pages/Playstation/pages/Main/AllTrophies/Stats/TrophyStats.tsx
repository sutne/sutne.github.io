import { Stack, Typography } from '@mui/material';
import { ShimmerText } from '../../../../../../components/animated/shimmer';
import { TabBar } from '../../../../TabBar';
import { useTrophyStats } from '../../../../providers/trophy-stats-provider';
import {
  EarnedTimePlot,
  EarnedTimePlotShimmer,
} from './EarnedTimePlot/EarnedTimePlot';
import { TrophyGameCompletion } from './TrophyGameCompletionRate/TrophyGameCompletionRate';

export function PlaystationTrophyStats() {
  const { isLoading, earnedTimestamps } = useTrophyStats();

  const sx = getSx();
  return (
    <>
      <TabBar />
      <Stack spacing={2}>
        <Stack direction='row' spacing='8px'>
          <Typography sx={sx.header}>Stats for </Typography>
          {isLoading ? (
            <ShimmerText fontSize={sx.header.fontSize} width='64px' inline />
          ) : (
            <Typography sx={{ ...sx.header, fontWeight: 900 }}>
              {earnedTimestamps?.length}
            </Typography>
          )}
          <Typography sx={sx.header}> earned trophies</Typography>
        </Stack>
        {isLoading ? (
          <EarnedTimePlotShimmer />
        ) : (
          <EarnedTimePlot timestamps={earnedTimestamps ?? []} />
        )}
        <TrophyGameCompletion />
      </Stack>
    </>
  );
  function getSx() {
    return {
      header: {
        fontSize: { xs: '20px', sm: '36px' },
        fontWeight: 200,
      },
    };
  }
}
