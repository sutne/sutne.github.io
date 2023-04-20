import React from 'react';

const AppContext = React.createContext<
  | {
      iconReferences: Map<string, React.RefObject<HTMLImageElement>>;
      isOpenStates: Map<string, boolean>;
      // updateReference: (
      //   name: string,
      //   ref: React.RefObject<HTMLImageElement>,
      // ) => void;
      // toggleOpenState: (name: string, isOpen: boolean) => void;
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

  // const updateReference = (
  //   name: string,
  //   ref: React.RefObject<HTMLImageElement>,
  // ) => {
  //   iconReferences.set(name, ref);
  //   setIconReferences(new Map(iconReferences));
  // };

  // const toggleOpenState = (name: string) => {
  //   const isOpen = isOpenStates.get(name);
  //   isOpenStates.set(name, !isOpen);
  //   setIsOpenStates(new Map(isOpenStates));
  // };

  const contextValues = {
    iconReferences,
    isOpenStates,
    // updateReference,
    // toggleOpenState,
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
    throw new Error('useApp must be used within a AppProvider');
  }
  return { ...context };
}
