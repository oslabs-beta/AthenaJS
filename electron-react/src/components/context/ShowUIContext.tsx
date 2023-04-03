import React, { useState, createContext, SetStateAction, Dispatch } from 'react';

interface ShowUIType {
  showUI: (boolean | Dispatch<SetStateAction<boolean>>)[]
}

export const ShowUIContext = createContext<ShowUIType | null>(null);

//This state is used to determine if we show the UI page or the Component page (UI Mode/Component mode)
export const ShowUIProvider = ({ children } : any) => {
  const [showUI, setShowUI] = useState(false);

  return (
    <ShowUIContext.Provider
      value={{
        showUI: [showUI, setShowUI]
      }}
    >
      {children}
    </ShowUIContext.Provider>
  );
};
