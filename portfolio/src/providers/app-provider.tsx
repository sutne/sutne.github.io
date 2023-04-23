import React from 'react';

const AppContext = React.createContext<
  | {
      getIconRef: (name: string) => React.RefObject<HTMLImageElement>;
      getIsOpen: (name: string) => boolean;
      setIsOpen: (name: string, isOpen: boolean) => void;
    }
  | undefined
>(undefined);

export function AppProvider(props: { children: JSX.Element }) {
  const [iconReferences, setIconReferences] = React.useState(
    new Map<string, React.RefObject<HTMLImageElement>>(),
  );
  const [isOpenStates, setIsOpenStates] = React.useState(
    new Map<string, boolean>(),
  );

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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (context !== undefined) return { ...context };
  throw new Error('useApp must be used within a AppProvider');
}
