import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

import * as API from '../../service/api';
import { TrophyGame } from '../../service/types';

import { TrophyTitle } from './components/TrophyTitle';

export function PlaystationTrophies() {
  const [gameList, setGameList] = React.useState<TrophyGame[]>([]);

  React.useEffect(() => {
    const getData = async () => {
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
