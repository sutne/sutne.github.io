import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import * as API from '../../service/api';
import { TrophyGroup } from '../../service/types';
import { Group } from './components/group';
import { SortProvider } from './providers/sort-provider';

export function PlaystationTrophiesGame() {
  const [groups, setGroups] = useState<TrophyGroup[]>([]);

  const params = useParams();

  useEffect(() => {
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

  return (
    <Stack spacing={2}>
      {groups.map((group, i) => (
        <SortProvider key={i}>
          <Group group={group} hasGroups={groups.length > 1} />
        </SortProvider>
      ))}
    </Stack>
  );
}
