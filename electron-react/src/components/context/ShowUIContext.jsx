import React, { useState, createContext } from "react";

export const ShowUIContext = createContext();

//This state is used to determine if we show the UI page or the Component page (UI Mode/Component mode)
export const ShowUIProvider = ({ children }) => {
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
