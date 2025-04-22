import { Stack } from '@mui/material';
import {
  TrophyProgressCard,
  TrophyProgressCardShimmer,
} from 'pages/Playstation/components/TrophyProgressCard';
import { SortProvider } from 'providers/sort-provider';
import { useSingleGameTrophies } from '../../contexts/SingleGameTrophies';
import { GroupButton } from './components/GroupButton';
import { TrophyList } from './components/TrophyList';

export function PlaystationTrophiesGame() {
  const {
    isLoading,
    groups,
    storedGroupCount,
    gameAsGroup,
    groupBy,
    setGroupBy,
  } = useSingleGameTrophies();

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
          Array(storedGroupCount)
            .fill(null)
            .map((_, i) => `trophy-progress-card-shimmer-${i}`)
            .map((key) => <TrophyProgressCardShimmer key={key} />)
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
                alwaysExpanded={groups.length === 1}
                preserveState
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
