import { Typography } from '@mui/material';
import { TabBar } from '../../../../TabBar';
import { useTrophyStats } from '../../../../providers/trophy-stats-provider';
import { CompleteTrophyList } from '../components/complete-trophy-list';

export function TrophyLog() {
  const { isLoading, earnedTrophies } = useTrophyStats();
  return (
    <>
      <TabBar />
      <Typography variant='h2' sx={{ marginBottom: '8px' }}>
        Trophy Log
      </Typography>
      <Typography sx={{ marginBottom: '16px' }}>
        Most recently earned trophies.
      </Typography>
      <CompleteTrophyList
        storageKey='trophy-log-page'
        isLoading={isLoading}
        trophies={earnedTrophies}
        earned
      />
    </>
  );
}
