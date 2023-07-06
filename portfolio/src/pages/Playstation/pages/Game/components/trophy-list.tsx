import React from 'react';
import { Box, Stack } from '@mui/material';

import { SortButton } from 'components/sort-button';
import { useSorting } from 'providers/sort-provider';

import { Trophy } from '../../../service/types';
import { sortTrophies } from '../util';

import { Trophy as TrophyComp } from './trophy';

export function TrophyList(props: { list: Trophy[] }) {
  const [trophies, setTrophies] = React.useState(props.list);

  const { sorting } = useSorting();

  React.useEffect(() => {
    setTrophies(sortTrophies([...props.list], sorting));
  }, [sorting]);

  const sx = getSx();
  return (
    <Box sx={sx.trophyList}>
      <Stack sx={sx.buttonRow} direction='row' spacing={1}>
        <SortButton type='Default' />
        <SortButton type='Rarity' />
        <SortButton type='Earned Time' />
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
