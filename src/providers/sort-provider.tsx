import type React from 'react';
import { type JSX, createContext, useContext } from 'react';
import { useSessionState } from '../pages/Playstation/hooks/useSessionState';

export type SortOrder = 'asc' | 'desc';
export type Sorting = {
  type: string;
  order: SortOrder;
};

const SortContext = createContext<
  | undefined
  | {
      sorting: Sorting;
      setSorting: React.Dispatch<React.SetStateAction<Sorting>>;
    }
>(undefined);

export function SortProvider(props: {
  defaultSorting: Sorting;
  children: JSX.Element;
  storageKey: string;
}) {
  const [sorting, setSorting] = useSessionState<Sorting>(
    props.storageKey,
    props.defaultSorting,
  );

  const contextValues = {
    sorting,
    setSorting,
  };
  return (
    <SortContext.Provider value={contextValues}>
      {props.children}
    </SortContext.Provider>
  );
}

export function useSorting() {
  const context = useContext(SortContext);
  if (context !== undefined) return { ...context };
  throw new Error('useSorting must be used within a SortProvider');
}
