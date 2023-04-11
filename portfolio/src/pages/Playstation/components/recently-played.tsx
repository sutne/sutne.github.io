import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import * as API from '../service/api';
import { GameType } from '../service/types';
import { GameCard } from './game-card';

export function RecentlyPlayed() {
  const [gameList, setGameList] = useState<GameType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getRecentGames();
      if (!response) return;
      setGameList(response);
    };
    getData();
  }, []);

  return (
    <>
      <Grid container spacing={'8px'}>
        {gameList.map((game, i) => (
          <Grid key={i} xs={6} sm={4} md={3} item>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
