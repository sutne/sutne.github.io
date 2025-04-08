import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as API from '../../Playstation/service/api';
import { useLocalState } from '../hooks/useStorageState';
import type { TrophyGame } from '../service/types';

const TrophiesContext = createContext<
  | {
      isLoading: boolean;
      gameList: TrophyGame[] | undefined;
      storedGameCount: number;
    }
  | undefined
>(undefined);

export function TrophiesProvider(props: { children: JSX.Element }) {
  const [gameList, setGameList] = useState<TrophyGame[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [storedGameCount, setStoredGameCount] = useLocalState('game-count', 5);

  useEffect(() => {
    if (gameList?.length) return;
    const getData = async () => {
      setIsLoading(true);
      const response = await API.getGameList();
      setGameList(response);
      setStoredGameCount(response?.length);
      setIsLoading(false);
    };
    getData();
  }, [gameList, setStoredGameCount]);

  return (
    <TrophiesContext.Provider
      value={{
        isLoading,
        gameList,
        storedGameCount,
      }}
    >
      {props.children}
    </TrophiesContext.Provider>
  );
}

export function useTrophies() {
  const context = useContext(TrophiesContext);
  if (context !== undefined) return context;
  throw new Error('useTrophies must be used within a TrophiesProvider');
}
