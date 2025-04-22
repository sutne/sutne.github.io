import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useLocalState, useSessionState } from '../../../hooks/useStorageState';
import * as API from '../service/api';
import type { Platform, Trophy, TrophyGroup } from '../service/types';
import { groupByEarned, groupByType } from '../util/grouping';
import {
  emptyTrophyCount,
  getTrophyCountProgress,
  mergeTrophyCounts,
} from '../util/merging';

export type TrophyGameGroupBy = 'Default' | 'Earned' | 'Type';

const SingleGameTrophiesContext = createContext<
  | {
      isLoading: boolean;
      groups: TrophyGroup[] | undefined;
      storedGroupCount: number;
      gameAsGroup: TrophyGroup | undefined;
      groupBy: TrophyGameGroupBy;
      setGroupBy: React.Dispatch<React.SetStateAction<TrophyGameGroupBy>>;
      getTrophyDetails: (
        id: number,
      ) => { trophy: Trophy; group: TrophyGroup } | undefined;
    }
  | undefined
>(undefined);

export function SingleGameTrophiesProvider(props: { children: JSX.Element }) {
  const params = useParams();

  const [groups, setGroups] = useState<TrophyGroup[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `group-count-${params.gameIds}-${params.platforms}`;
  const [storedGroupCount, setStoredGroupCount] = useLocalState(storageKey, 1);

  useEffect(() => {
    const getData = async () => {
      if (!params.gameIds || !params.platforms) return;
      setIsLoading(true);
      const response = await API.getTrophyGroups(
        params.gameIds.split(','),
        params.platforms.split(',') as Platform[],
      );
      setGroups(response);
      setStoredGroupCount(response?.length);
      setIsLoading(false);
    };
    getData();
  }, [params.gameIds, params.platforms, setStoredGroupCount]);

  const [groupBy, setGroupBy] = useSessionState<TrophyGameGroupBy>(
    'group-trophies-by',
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

  const getDisplayedGroups = () => {
    switch (groupBy) {
      case 'Earned':
        return earnedGroups;
      case 'Type':
        return typeGroups;
      default:
        return groups;
    }
  };

  function getTrophyDetails(trophyId: number) {
    const group = groups?.find((group) =>
      group.trophies.some((t) => t.id === trophyId),
    );
    const trophy = allTrophies?.find((t) => t.id === trophyId);
    if (!trophy || !group) return undefined;
    return { trophy, group };
  }

  const gameAsGroup: TrophyGroup | undefined = !groups?.[0]
    ? undefined
    : {
        ...groups[0],
        progress: getTrophyCountProgress(
          groups?.reduce(
            (earned, group) => mergeTrophyCounts(earned, group.earnedCount),
            emptyTrophyCount(),
          ),
          groups?.reduce(
            (defined, group) => mergeTrophyCounts(defined, group.trophyCount),
            emptyTrophyCount(),
          ),
        ),
        trophyCount: emptyTrophyCount(),
        earnedCount: emptyTrophyCount(),
      };

  return (
    <SingleGameTrophiesContext.Provider
      value={{
        isLoading,
        groups: getDisplayedGroups(),
        storedGroupCount,
        gameAsGroup,
        groupBy,
        setGroupBy,
        getTrophyDetails,
      }}
    >
      {props.children}
    </SingleGameTrophiesContext.Provider>
  );
}

export function useSingleGameTrophies() {
  const context = useContext(SingleGameTrophiesContext);
  if (context !== undefined) return context;
  throw new Error(
    'useSingleGameTrophies must be used within a SingleGameTrophiesProvider',
  );
}
