import React, { createRef, useState } from 'react';

const AppContext = React.createContext<
  | {
      name: string;
      isOpen: boolean;
      open: () => void;
      close: () => void;
      iconReference: React.RefObject<HTMLImageElement>;
    }
  | undefined
>(undefined);

type props = { name: string };
export function AppProvider({ ...props }: props & { children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  const contextValues = {
    isOpen,
    name: props.name,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    iconReference: createRef<HTMLImageElement>(),
  };

  return (
    <AppContext.Provider value={contextValues}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppMust be used within a AppProvider');
  }
  return { ...context };
}
