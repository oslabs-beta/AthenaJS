import React, { useState, createContext } from 'react';

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [compProps, setCompProps] = useState({color: "white"});
  const [compActions, setCompActions] = useState({
    handleClick: () => console.log('button clicked')
  });
  const [compHTML, setCompHTML] = useState(`
    <button> Click Me</button>
  `);
  return(
    <DetailsContext.Provider 
      value = {{
        compProps: [compProps, setCompProps], 
        compActions: [compActions, setCompActions], 
        compHTML: [compHTML, setCompHTML]
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};