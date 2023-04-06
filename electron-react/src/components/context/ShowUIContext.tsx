import React, { useState, createContext, SetStateAction, Dispatch } from 'react';
import { ShowUIType } from './ContextTypes';


export const ShowUIContext = createContext<ShowUIType | null>(null);

//This state is used to determine if we show the UI page or the Component page (UI Mode/Component mode)
export const ShowUIProvider = ({ children } : any) => {
  const [showUI, setShowUI] = useState<boolean>(false);

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
