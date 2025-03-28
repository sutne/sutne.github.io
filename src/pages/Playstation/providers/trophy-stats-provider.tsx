import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as API from '../service/api';
import type { Trophy } from '../service/types';

const TrophyStatsContext = createContext<
  | {
      isLoading: boolean;
      earnedTrophies: Trophy[] | undefined;
      unearnedTrophies: Trophy[] | undefined;
      earnedTimestamps: (Date | undefined)[] | undefined;
    }
  | undefined
>(undefined);

export function TrophyStatsProvider(props: { children: JSX.Element }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allTrophies, setAllTrophies] = useState<Trophy[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (allTrophies?.length) return;
    const getData = async () => {
      setIsLoading(true);
      const response = await API.getAllTrophies();
      setAllTrophies(response);
      setIsLoading(false);
    };
    getData();
  }, [allTrophies]);

  const earnedTrophies = allTrophies?.filter((t) => t.isEarned);
  const unearnedTrophies = allTrophies?.filter((t) => !t.isEarned);
  const earnedTimestamps = earnedTrophies?.map((t) =>
    !t.earnedAt ? undefined : new Date(t.earnedAt),
  );
  return (
    <TrophyStatsContext.Provider
      value={{
        isLoading,
        earnedTrophies,
        unearnedTrophies,
        earnedTimestamps,
      }}
    >
      {props.children}
    </TrophyStatsContext.Provider>
  );
}

export function useTrophyStats() {
  const context = useContext(TrophyStatsContext);
  if (context !== undefined) return context;
  throw new Error('useTrophyStats must be used within a TrophyStatsProvider');
}
