import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

import * as API from '../../service/api';
import { TrophyGame } from '../../service/types';

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

  return (
    <Stack spacing={2}>
      {gameList.map((game, i) => (
        <TrophyTitle key={i} game={game} />
      ))}
    </Stack>
  );
}
