import React, { useState, createContext } from "react";

export const ShowUIContext = createContext();

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
