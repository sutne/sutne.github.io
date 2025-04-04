import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TabBar } from '../../../../TabBar';
import { useSessionState } from '../../../../hooks/useStorageState';
import { useTrophyStats } from '../../../../providers/trophy-stats-provider';
import { CompleteTrophyCard } from '../../../Game/components/complete-trophy';
import { Paginator } from '../../components/paginator';

export function TrophyAdvisor() {
  const navigate = useNavigate();
  const { isLoading, unearnedTrophies } = useTrophyStats();

  const [pageIndex, setPageIndex] = useSessionState(
    'trophy-advisor-page-index',
    0,
  );
  const maxPageElementCount = 20;
  const pageCount = Math.ceil(
    (unearnedTrophies?.length ?? 0) / maxPageElementCount,
  );

  const trophies = [...(unearnedTrophies ?? [])].slice(
    pageIndex * maxPageElementCount,
    pageIndex * maxPageElementCount + maxPageElementCount,
  );

  if (isLoading) return <>Loading unearned trophies</>;
  return (
    <>
      <TabBar />
      <Typography variant='h2' sx={{ marginBottom: '8px' }}>
        Trophy Advisor
      </Typography>
      <Typography sx={{ marginBottom: '16px' }}>
        Suggestions for next trophies to earn.
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
      <Paginator
        pageCount={pageCount}
        currentPageIndex={pageIndex}
        onChange={setPageIndex}
      />
    </>
  );
}
