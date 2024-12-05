import { Grid } from '@mui/material';
import { Image } from 'components/image';
import { useEffect, useState } from 'react';
import * as API from '../../../service/api';
import type { RecentGame } from '../../../service/types';

export function RecentlyPlayed() {
  const unloaded = new Array<RecentGame>(12).fill({
    image: '',
    title: '',
    platform: undefined,
    lastPlayedAt: '',
  });
  const [gameList, setGameList] = useState<RecentGame[]>([]);

  useEffect(() => {
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
          // biome-ignore lint/suspicious/noArrayIndexKey: required to replace "shimmer"/empty ones
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
