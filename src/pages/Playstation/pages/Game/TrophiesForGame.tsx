import { Stack } from '@mui/material';
import {
  TrophyProgressCard,
  TrophyProgressCardShimmer,
} from 'pages/Playstation/components/trophy-progress-card';
import { SortProvider } from 'providers/sort-provider';
import { useSingleGameTrophies } from '../../providers/game-trophy-provider';
import { GroupButton } from './components/group-button';
import { TrophyList } from './components/trophy-list';

export function PlaystationTrophiesGame() {
  const { groups, isLoading, gameAsGroup, groupBy, setGroupBy } =
    useSingleGameTrophies();

  return (
    <>
      {groupBy !== 'Default' &&
        (isLoading ? (
          <TrophyProgressCardShimmer />
        ) : !gameAsGroup ? (
          <></>
        ) : (
          <TrophyProgressCard
            image={gameAsGroup.icon}
            title={gameAsGroup.name}
            progress={gameAsGroup.progress}
            trophyCount={gameAsGroup.trophyCount}
            earnedCount={gameAsGroup.earnedCount}
            alwaysExpanded={false}
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
        ) : !groups ? (
          <></>
        ) : (
          groups.map((group, i) => (
            <SortProvider
              key={`${group.name}-${i}`}
              storageKey='playstation-trophy-sorting'
              defaultSorting={{ type: 'Default', order: 'asc' }}
            >
              <TrophyProgressCard
                image={group.icon}
                title={group.name}
                progress={group.progress}
                trophyCount={group.trophyCount}
                earnedCount={group.earnedCount}
                alwaysExpanded={groups.length === 1 && group.name !== ''}
                preserveState={true}
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
