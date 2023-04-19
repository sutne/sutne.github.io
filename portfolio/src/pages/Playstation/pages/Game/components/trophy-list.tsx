import React from 'react';
import { Box, Stack } from '@mui/material';

import { Trophy } from '../../../service/types';
import { useSorting } from '../providers/sort-provider';
import { sortTrophies } from '../util';
import { SortButton } from './sort-button';
import { Trophy as TrophyComp } from './trophy';

export function TrophyList(props: { list: Trophy[] }) {
  const [trophies, setTrophies] = React.useState(props.list);

  const { sorting } = useSorting();

  React.useEffect(() => {
    setTrophies((prev) => sortTrophies(prev, sorting));
  }, [sorting]);

  const sx = getSx();
  return (
    <Box sx={sx.trophyList}>
      <Stack
        sx={{
          marginBottom: '3mm',
          overflow: 'hidden',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '0',
          },
        }}
        direction='row'
        spacing={1}
        alignItems={'center'}
      >
        <SortButton type='Default' />
        <SortButton type='Earned Time' />
        <SortButton type='Rarity' />
        <SortButton type='Grade' />
      </Stack>
      <Stack spacing={'4px'} alignItems={'center'}>
        {trophies.map((trophy, i) => (
          <TrophyComp key={i} trophy={trophy} />
        ))}
      </Stack>
    </Box>
  );
  function getSx() {
    return {
      trophyList: {
        padding: { md: '0 64px' },
        '&:after': {
          content: '""',
          display: 'block',
          width: '100%',
          height: '64px',
        },
      },
    };
  }
}
