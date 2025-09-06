import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext<
  | {
      getIconRef: (name: string) => React.RefObject<HTMLImageElement | null>;
      getIsOpen: (name: string) => boolean;
      setIsOpen: (name: string, isOpen: boolean) => void;
      hasOpenApp: boolean;
    }
  | undefined
>(undefined);

export function AppProvider(props: { children: React.ReactNode }) {
  const [iconReferences, setIconReferences] = useState(
    new Map<string, React.RefObject<HTMLImageElement | null>>(),
  );
  const [isOpenStates, setIsOpenStates] = useState(new Map<string, boolean>());

  const getIsOpen = (name: string) => {
    const isOpen = isOpenStates.get(name);
    return isOpen ?? false;
  };

  const setIsOpen = (name: string, isOpen: boolean) => {
    setIsOpenStates(new Map(isOpenStates.set(name, isOpen)));
  };

  const getIconRef = (name: string) => {
    const ref = iconReferences.get(name);
    if (ref !== undefined) return ref;
    const newRef = React.createRef<HTMLImageElement>();
    setIconReferences(iconReferences.set(name, newRef));
    return newRef;
  };

  return (
    <AppContext.Provider
      value={{
        getIconRef,
        setIsOpen,
        getIsOpen,
        hasOpenApp: Array.from(isOpenStates.values()).some((isOpen) => isOpen),
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context !== undefined) return context;
  throw new Error('useApp must be used within a AppProvider');
}
