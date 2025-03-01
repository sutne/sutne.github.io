import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { SortButton } from '../../../../components/sort-button';
import { useSorting } from '../../../../providers/sort-provider';
import * as API from '../../service/api';
import type { TrophyGame } from '../../service/types';
import { sortGames } from '../Game/sortUtils';
import { TrophyTitle } from './components/TrophyTitle';

export function PlaystationTrophies() {
  const unloaded: TrophyGame[] = new Array<TrophyGame>(4).fill({
    platform: [{ id: '', platform: undefined }],
    title: '',
    image: '',
    trophyCount: {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
    },
    earnedCount: {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
    },
    progress: 0,
  });
  const [gameList, setGameList] = useState<TrophyGame[]>(unloaded);

  const { sorting } = useSorting();
  useEffect(() => {
    setGameList((prev) => sortGames([...prev], sorting));
  }, [sorting]);

  useEffect(() => {
    const getData = async () => {
      setGameList(unloaded);
      const response = await API.getGameList();
      if (!response) return;
      setGameList(response.filter((g) => g !== null));
    };
    getData();
  }, []);

  if (!gameList.length) return <CircularProgress />;

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
        {gameList.map((game, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: required to replace "shimmer"/empty ones
          <TrophyTitle key={i} game={game} />
        ))}
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
