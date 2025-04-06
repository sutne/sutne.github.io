import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TabBar } from '../../../../TabBar';
import { useSessionState } from '../../../../hooks/useStorageState';
import { useTrophyStats } from '../../../../providers/trophy-stats-provider';
import { CompleteTrophyCard } from '../../../Game/components/complete-trophy';
import { Paginator } from '../../components/paginator';

export const maxPageElementCount = 30;

export function TrophyLog() {
  const navigate = useNavigate();
  const { isLoading, earnedTrophies } = useTrophyStats();

  const [pageIndex, setPageIndex] = useSessionState('trophy-log-page', 0);
  const pageCount = Math.ceil(
    (earnedTrophies?.length ?? 0) / maxPageElementCount,
  );
  const currentIndex = Math.max(0, Math.min(pageCount - 1, pageIndex));

  const trophies = [...(earnedTrophies ?? [])].slice(
    currentIndex * maxPageElementCount,
    currentIndex * maxPageElementCount + maxPageElementCount,
  );

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
      <Paginator
        pageCount={pageCount}
        currentPageIndex={currentIndex}
        onChange={setPageIndex}
      >
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
      </Paginator>
    </>
  );
}
