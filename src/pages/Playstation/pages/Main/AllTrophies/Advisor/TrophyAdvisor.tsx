import { Typography } from '@mui/material';
import { TabBar } from '../../../../TabBar';
import { useTrophyStats } from '../../../../providers/trophy-stats-provider';
import { CompleteTrophyList } from '../components/complete-trophy-list';

export function TrophyAdvisor() {
  const { isLoading, unearnedTrophies } = useTrophyStats();
  return (
    <>
      <TabBar />
      <Typography variant='h2' sx={{ marginBottom: '8px' }}>
        Trophy Advisor
      </Typography>
      <Typography sx={{ marginBottom: '16px' }}>
        Suggestions for next trophies to earn.
      </Typography>
      <CompleteTrophyList
        storageKey='trophy-advisor-page'
        isLoading={isLoading}
        trophies={unearnedTrophies}
      />
    </>
  );
}
