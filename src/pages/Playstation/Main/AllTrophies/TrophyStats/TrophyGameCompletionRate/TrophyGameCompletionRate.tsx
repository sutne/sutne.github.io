import { Stack, Typography } from '@mui/material';
import { ShimmerText } from '../../../../../../components/animated/shimmer';
import { useTrophies } from '../../../../contexts/Trophies';
import { useTrophyGames } from '../../../../contexts/TrophyGames';

export function TrophyGameCompletion() {
  const { isLoading: isLoadingGames, gameList } = useTrophyGames();
  const { isLoading: isLoadingTrophies, unearnedTrophies } = useTrophies();

  const gameCount = gameList?.length ?? 0;
  const completedGameCount = !gameList
    ? 0
    : gameList.filter((game) => game.progress === 100).length;
  const completionPercentage = !gameList
    ? 0
    : gameList.reduce((sum, game) => sum + game.progress, 0) / (gameCount || 1);
  const unearnedTrophyCount = unearnedTrophies?.length ?? 0;

  return (
    <Stack direction='row' justifyContent='space-evenly' spacing={2}>
      <Detail
        label='Games Played'
        value={gameCount}
        isLoading={isLoadingGames}
      />
      <Detail
        label='Games Completed'
        value={completedGameCount}
        isLoading={isLoadingGames}
      />
      <Detail
        label='Average Game Completion'
        value={`${completionPercentage.toFixed(1)}%`}
        isLoading={isLoadingGames}
      />
      <Detail
        label='Unearned Trophies'
        value={unearnedTrophyCount}
        isLoading={isLoadingTrophies}
      />
    </Stack>
  );
}

function Detail(props: {
  value: string | number;
  label: string;
  isLoading: boolean;
}) {
  const sx = getSx();
  return (
    <Stack direction='column' justifyContent='center' alignItems='center'>
      {props.isLoading ? (
        <ShimmerText fontSize={sx.value.fontSize} />
      ) : (
        <Typography sx={sx.value}>{`${props.value}`}</Typography>
      )}
      <Typography sx={sx.label}>{props.label}</Typography>
    </Stack>
  );
  function getSx() {
    return {
      value: {
        fontSize: { xs: '1.4rem', sm: '2rem' },
        marginBottom: '-0.3rem',
        textAlign: 'center',
      },
      label: {
        fontSize: { xs: '0.7rem', sm: '1rem' },
        color: 'text.secondary',
        textAlign: 'center',
      },
    };
  }
}
