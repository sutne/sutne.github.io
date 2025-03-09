import { Stack } from '@mui/material';
import { SortButton } from '../../../../components/sort-button';
import { useTrophies } from '../../providers/trophy-provider';
import { TrophyTitle, TrophyTitleShimmer } from './components/TrophyTitle';

export function PlaystationTrophies() {
  const { isLoading, gameList } = useTrophies();

  const sx = getSx();
  return (
    <>
      <Stack sx={sx.buttonRow} direction='row' spacing={1}>
        <SortButton type='Latest Trophy' />
        <SortButton type='First Trophy' />
        <SortButton type='Progress' />
        <SortButton type='Title' />
      </Stack>
      <Stack spacing={{ xs: '20px', md: '30px' }}>
        {isLoading ? (
          Array(5)
            .fill(null)
            .map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: no other value to use
              <TrophyTitleShimmer key={i} />
            ))
        ) : !gameList ? (
          <></>
        ) : (
          gameList.map((game) => (
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
        padding: '8px 16px',
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
