import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TabBar } from '../../../../TabBar';
import { useTrophyStats } from '../../../../providers/trophy-stats-provider';
import { CompleteTrophyCard } from '../../../Game/components/complete-trophy';

export function TrophyLog() {
  const navigate = useNavigate();
  const { isLoading, earnedTrophies } = useTrophyStats();

  const trophies = [...(earnedTrophies ?? [])].slice(0, 10);

  if (isLoading) return <>Loading earned trophies...</>;
  return (
    <>
      <TabBar />
      <Typography variant='h2' sx={{ marginBottom: '8px' }}>
        Trophy Log
      </Typography>
      <Typography sx={{ marginBottom: '16px' }}>
        Most recently earned trophies.
      </Typography>
      <Stack spacing='8px'>
        {trophies?.map((trophy) => (
          <CompleteTrophyCard
            key={`${trophy.game.id}${trophy.id}`}
            trophy={trophy}
            onClick={() =>
              navigate(
                `/Playstation/trophies/game/${trophy.game.id}/platform/${trophy.game.platform}/trophy/${trophy.id}`,
              )
            }
          />
        ))}
      </Stack>
    </>
  );
}
