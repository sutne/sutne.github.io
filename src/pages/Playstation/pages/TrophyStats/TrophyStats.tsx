import { Stack, Typography } from '@mui/material';
import { useTrophyStats } from '../../providers/trophy-stats-provider';

export function PlaystationTrophyStats() {
  const { isLoading, earnedTimestamps } = useTrophyStats();

  if (isLoading) return <>Loading...</>;
  if (!earnedTimestamps) return <>???</>;
  return (
    <>
      <Stack spacing={2}>
        <Typography>
          History for the <b>{earnedTimestamps.length}</b> earned trophies.
        </Typography>
      </Stack>
    </>
  );
}
