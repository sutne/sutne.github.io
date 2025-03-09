import {
  type JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSorting } from '../../../providers/sort-provider';
import { sortGames } from '../pages/Game/sortUtils';
import * as API from '../service/api';
import type { TrophyGame } from '../service/types';

const TrophiesContext = createContext<
  | {
      gameList: TrophyGame[] | undefined;
      isLoading: boolean;
    }
  | undefined
>(undefined);

export function TrophiesProvider(props: { children: JSX.Element }) {
  const [gameList, setGameList] = useState<TrophyGame[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { sorting } = useSorting();
  useEffect(() => {
    setGameList((prev) => {
      return !prev ? prev : sortGames([...prev], sorting);
    });
  }, [sorting]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await API.getGameList();
      setGameList(response);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <TrophiesContext.Provider value={{ isLoading, gameList }}>
      {props.children}
    </TrophiesContext.Provider>
  );
}

export function useTrophies() {
  const context = useContext(TrophiesContext);
  if (context !== undefined) return { ...context };
  throw new Error('useTrophies must be used within a TrophiesProvider');
}
