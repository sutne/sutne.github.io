import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as API from '../service/api';
import type { CompleteTrophy } from '../service/types';

const TrophyStatsContext = createContext<
  | {
      isLoading: boolean;
      earnedTrophies: CompleteTrophy[] | undefined;
      unearnedTrophies: CompleteTrophy[] | undefined;
      earnedTimestamps: (Date | undefined)[] | undefined;
      getTrophy: (
        gameId: string,
        trophyId: number,
      ) => CompleteTrophy | undefined;
    }
  | undefined
>(undefined);

export function TrophyStatsProvider(props: { children: JSX.Element }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allTrophies, setAllTrophies] = useState<CompleteTrophy[] | undefined>(
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

  function getTrophy(
    gameId: string,
    trophyId: number,
  ): CompleteTrophy | undefined {
    if (isLoading || !allTrophies) return undefined;
    for (const trophy of allTrophies) {
      if (trophy.id !== trophyId) continue;
      if (trophy.game.id !== gameId) continue;
      return trophy;
    }
    return undefined;
  }

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
        getTrophy,
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
