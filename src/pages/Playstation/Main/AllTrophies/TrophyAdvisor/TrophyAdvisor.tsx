import { Typography } from '@mui/material';
import { TabBar } from '../../../components/TabBar';
import { useTrophies } from '../../../contexts/Trophies';
import { CompleteTrophyList } from '../components/CompleteTrophyList';

export function TrophyAdvisor() {
  const { isLoading, unearnedTrophies } = useTrophies();
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
