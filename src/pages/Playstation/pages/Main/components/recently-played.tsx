import React from 'react';
import { Grid } from '@mui/material';

import { Image } from 'components/image';

import * as API from '../../../service/api';
import { RecentGame } from '../../../service/types';

export function RecentlyPlayed() {
  const unloaded = new Array<RecentGame>(12).fill({
    image: '',
    title: '',
    platform: undefined,
    lastPlayedAt: '',
  });
  const [gameList, setGameList] = React.useState<RecentGame[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      setGameList(unloaded);
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
            <Image
              src={game.image}
              sx={{
                borderRadius: '7%',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
