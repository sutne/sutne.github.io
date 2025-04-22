import { Typography } from '@mui/material';
import { TabBar } from '../../../components/TabBar';
import { useTrophies } from '../../../contexts/Trophies';
import { CompleteTrophyList } from '../components/CompleteTrophyList';

export function TrophyLog() {
  const { isLoading, earnedTrophies } = useTrophies();
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
