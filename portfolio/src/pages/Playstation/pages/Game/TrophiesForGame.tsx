import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { TrophyProgressCard } from 'pages/Playstation/components/trophy-progress-card';
import { SortProvider } from 'providers/sort-provider';

import * as API from '../../service/api';
import { TrophyGroup } from '../../service/types';

import { TrophyList } from './components/trophy-list';

export function PlaystationTrophiesGame() {
  const unloaded = new Array<TrophyGroup>(1).fill({
    name: '',
    icon: '',
    trophyCount: {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
    },
    earnedCount: {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
    },
    progress: 0,
    trophies: [],
  });
  const [groups, setGroups] = React.useState<TrophyGroup[]>(unloaded);

  const params = useParams();

  React.useEffect(() => {
    const getData = async () => {
      if (!params.gameId || !params.platform) return;
      setGroups(unloaded);
      const response = await API.getTrophyGroups(
        params.gameId,
        params.platform,
      );
      setGroups([]);
      if (!response) return;
      setGroups(response);
    };
    getData();
  }, []);

  return (
    <Stack spacing={2}>
      {groups.map((group, i) => (
        <SortProvider
          key={`${group.name}-${i}`}
          defaultSorting={{ type: 'Default', order: 'asc' }}
        >
          <TrophyProgressCard
            image={group.icon}
            title={group.name}
            progress={group.progress}
            trophyCount={group.trophyCount}
            earnedCount={group.earnedCount}
            expanded={groups.length == 1 && group.name !== ''}
          >
            <TrophyList list={group.trophies} />
          </TrophyProgressCard>
        </SortProvider>
      ))}
    </Stack>
  );
}
