import { Stack, Typography } from '@mui/material';
import { SortButton } from '../../../../components/sort-button';
import { useSorting } from '../../../../providers/sort-provider';
import { TabBar } from '../../components/TabBar';
import { useTrophyGames } from '../../contexts/TrophyGames';
import { sortGames } from '../../util/sorting';
import { TrophyTitle, TrophyTitleShimmer } from './components/TrophyTitle';

export function PlaystationTrophies() {
  const { isLoading, gameList, storedGameCount } = useTrophyGames();
  const { sorting } = useSorting();
  const sortedGames = sortGames([...(gameList ?? [])], sorting);

  const sx = getSx();
  return (
    <>
      <TabBar />
      <Typography variant='h2' sx={{ marginBottom: '16px' }}>
        Game Overview
      </Typography>
      <Stack sx={sx.buttonRow} direction='row' spacing={1}>
        <SortButton type='Latest Trophy' />
        <SortButton type='First Trophy' />
        <SortButton type='Progress' />
        <SortButton type='Title' />
      </Stack>
      <Stack spacing={{ xs: '20px', md: '30px' }}>
        {isLoading ? (
          Array(storedGameCount)
            .fill(null)
            .map((_, i) => `trophy-title-${i}`)
            .map((key) => <TrophyTitleShimmer key={key} />)
        ) : !sortedGames ? (
          <></>
        ) : (
          sortedGames.map((game) => (
            <TrophyTitle key={game.title + game.platform} game={game} />
          ))
        )}
      </Stack>
    </>
  );
  function getSx() {
    return {
      trophyList: {
        padding: { md: '0 64px' },
      },
      buttonRow: {
        padding: '8px',
        maxWidth: 'fit-content',
        bgcolor: 'background.paper',
        borderRadius: '30mm',
        marginBottom: '16px',
        overflow: 'hidden',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '0',
        },
      },
    };
  }
}
