import { Stack } from '@mui/material';
import {
  TrophyProgressCard,
  TrophyProgressCardShimmer,
} from 'pages/Playstation/components/trophy-progress-card';
import { SortProvider } from 'providers/sort-provider';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../service/api';
import type { Platform, Trophy, TrophyGroup } from '../../service/types';
import { GroupButton } from './components/group-button';
import { TrophyList } from './components/trophy-list';
import { groupByEarned, groupByType } from './groupUtils';

export function PlaystationTrophiesGame() {
  const params = useParams();

  const [groups, setGroups] = useState<TrophyGroup[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (!params.gameIds || !params.platforms) return;
      setIsLoading(true);
      const response = await API.getTrophyGroups(
        params.gameIds.split(','),
        params.platforms.split(',') as Platform[],
      );
      setGroups(response);
      setIsLoading(false);
    };
    getData();
  }, [params.gameIds, params.platforms]);

  const [groupBy, setGroupBy] = useState<'Default' | 'Earned' | 'Type'>(
    'Default',
  );

  const allTrophies: Trophy[] = useMemo(
    () =>
      groups?.reduce(
        (trophies, group) => trophies.concat(group.trophies),
        [] as Trophy[],
      ) ?? [],
    [groups],
  );
  const earnedGroups = useMemo(() => groupByEarned(allTrophies), [allTrophies]);
  const typeGroups = useMemo(() => groupByType(allTrophies), [allTrophies]);

  const displayedGroups =
    groupBy === 'Default'
      ? groups
      : groupBy === 'Earned'
        ? earnedGroups
        : typeGroups;

  return (
    <>
      {groupBy !== 'Default' &&
        (isLoading ? (
          <TrophyProgressCardShimmer />
        ) : !groups ? (
          <></>
        ) : (
          <TrophyProgressCard
            image={groups[0].icon}
            title={groups[0].name}
            progress={-1}
            trophyCount={{
              platinum: 0,
              gold: 0,
              silver: 0,
              bronze: 0,
            }}
            earnedCount={{
              platinum: 0,
              gold: 0,
              silver: 0,
              bronze: 0,
            }}
            expanded={false}
          />
        ))}
      <Stack
        sx={{
          marginY: '16px',
          borderRadius: '32px',
          padding: '12px',
          backgroundColor: 'background.paper',
          width: 'fit-content',
        }}
        direction='row'
        spacing={1}
      >
        <GroupButton
          type='Default'
          isSelected={groupBy === 'Default'}
          onClick={() => setGroupBy('Default')}
        />
        <GroupButton
          type='Earned'
          isSelected={groupBy === 'Earned'}
          onClick={() => setGroupBy('Earned')}
        />
        <GroupButton
          type='Type'
          isSelected={groupBy === 'Type'}
          onClick={() => setGroupBy('Type')}
        />
      </Stack>
      <Stack spacing={2}>
        {isLoading ? (
          Array(1)
            .fill(null)
            .map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: no other value to use
              <TrophyProgressCardShimmer key={i} />
            ))
        ) : !displayedGroups ? (
          <></>
        ) : (
          displayedGroups.map((group, i) => (
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
                expanded={displayedGroups.length === 1 && group.name !== ''}
              >
                <TrophyList list={group.trophies} />
              </TrophyProgressCard>
            </SortProvider>
          ))
        )}
      </Stack>
    </>
  );
}
