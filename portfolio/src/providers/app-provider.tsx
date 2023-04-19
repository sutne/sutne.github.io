import React from 'react';

const AppContext = React.createContext<
  | {
      iconReferences: Map<string, React.RefObject<HTMLImageElement>>;
    }
  | undefined
>(undefined);

export function AppProvider(props: { children: JSX.Element }) {
  const iconReferences = new Map<string, React.RefObject<HTMLImageElement>>();

  // const [isOpen, setIsOpen] = React.useState(false);

  const contextValues = {
    iconReferences,
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
