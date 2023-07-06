import React from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';

import { SortProvider } from 'providers/sort-provider';

import * as API from '../../service/api';
import { TrophyGroup } from '../../service/types';

import { Group } from './components/group';

export function PlaystationTrophiesGame() {
  const [groups, setGroups] = React.useState<TrophyGroup[]>([]);

  const params = useParams();

  React.useEffect(() => {
    const getData = async () => {
      if (!params.gameId || !params.platform) return;
      const response = await API.getTrophyGroups(
        params.gameId,
        params.platform,
      );
      if (!response) return;
      setGroups(response);
    };
    getData();
  }, []);

  if (!groups.length) return <CircularProgress />;
  return (
    <Stack spacing={2}>
      {groups.map((group, i) => (
        <SortProvider
          defaultSorting={{ type: 'Default', order: 'asc' }}
          key={i}
        >
          <Group group={group} hasGroups={groups.length > 1} />
        </SortProvider>
      ))}
    </Stack>
  );
}
