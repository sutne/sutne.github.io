import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { SortButton } from '../../../../components/sort-button';
import { useSorting } from '../../../../providers/sort-provider';
import * as API from '../../service/api';
import type { TrophyGame } from '../../service/types';
import { sortGames } from '../Game/sortUtils';
import { TrophyTitle, TrophyTitleShimmer } from './components/TrophyTitle';

export function PlaystationTrophies() {
  const [gameList, setGameList] = useState<TrophyGame[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { sorting } = useSorting();
  useEffect(() => {
    setGameList((prev) => {
      return !prev ? prev : sortGames([...prev], sorting);
    });
  }, [sorting]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await API.getGameList();
      setGameList(sortGames(response, sorting));
      setIsLoading(false);
    };
    getData();
  }, []);

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
