import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalState } from '../../../hooks/useStorageState';
import * as API from '../service/api';
import type { TrophyGame } from '../service/types';

const TrophyGamesContext = createContext<
  | {
      isLoading: boolean;
      gameList: TrophyGame[] | undefined;
      storedGameCount: number;
    }
  | undefined
>(undefined);

export function TrophyGamesProvider(props: { children: JSX.Element }) {
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
    <TrophyGamesContext.Provider
      value={{
        isLoading,
        gameList,
        storedGameCount,
      }}
    >
      {props.children}
    </TrophyGamesContext.Provider>
  );
}

export function useTrophyGames() {
  const context = useContext(TrophyGamesContext);
  if (context !== undefined) return context;
  throw new Error('useTrophyGames must be used within a TrophyGamesProvider');
}
