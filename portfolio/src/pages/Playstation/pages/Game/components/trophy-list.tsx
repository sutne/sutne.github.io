import React from 'react';
import { Box, Stack } from '@mui/material';

import { SortButton } from 'components/sort-button';
import { useSorting } from 'providers/sort-provider';

import { Trophy } from '../../../service/types';
import { sortTrophies } from '../sortUtils';

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
      {props.list.length > 1 && (
        <Stack sx={sx.buttonRow} direction='row' spacing={1}>
          <SortButton type='Default' />
          <SortButton type='Rarity' />
          <SortButton type='Earned Time' />
          <SortButton type='Grade' />
        </Stack>
      )}
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
        padding: { md: '0 0 0 64px' },
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
