import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

import { SortButton } from '../../../../components/sort-button';
import { useSorting } from '../../../../providers/sort-provider';
import * as API from '../../service/api';
import { TrophyGame } from '../../service/types';
import { sortGames } from '../Game/sortUtils';

import { TrophyTitle } from './components/TrophyTitle';

export function PlaystationTrophies() {
  const unloaded: TrophyGame[] = new Array(4).fill({
    id: '',
    title: '',
    image: '',
    platform: '',
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
  const [gameList, setGameList] = React.useState<TrophyGame[]>(unloaded);

  const { sorting } = useSorting();
  React.useEffect(() => {
    setGameList((prev) => sortGames([...prev], sorting));
  }, [sorting]);

  React.useEffect(() => {
    const getData = async () => {
      setGameList(unloaded);
      const response = await API.getGameList();
      if (!response) return;
      setGameList(response);
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
      </Stack>
      <Stack spacing={2}>
        {gameList.map((game, i) => (
          <TrophyTitle key={`${game.id}-${i}`} game={game} />
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
