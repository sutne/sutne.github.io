import React from 'react';

export type SortOrder = 'asc' | 'desc';
export type Sorting = {
  type: string;
  order: SortOrder;
};

const SortContext = React.createContext<
  | undefined
  | {
      sorting: Sorting;
      setSorting: React.Dispatch<React.SetStateAction<Sorting>>;
    }
>(undefined);

export function SortProvider(props: {
  defaultSorting: Sorting;
  children: JSX.Element;
}) {
  const [sorting, setSorting] = React.useState<Sorting>(props.defaultSorting);

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
  const context = React.useContext(SortContext);
  if (context !== undefined) return { ...context };
  throw new Error('useSorting must be used within a SortProvider');
}
