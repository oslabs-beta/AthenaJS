import React, { useState, createContext } from 'react';

export const CompUIContext = createContext();

export const CompUIProvider = ({ children }) => {
  const [ compsUI, setCompsUI ] = useState([]);
    
  return(
    <CompUIContext.Provider 
      value = {{
        compsUI: [ compsUI, setCompsUI ]
      }}
    >
      {children}
    </CompUIContext.Provider>
  );
};