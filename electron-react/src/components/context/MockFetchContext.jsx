import React, { useState, createContext } from 'react';

export const MockFetchContext = createContext();

export const MockFetchProvider = ({ children }) => {
  const [ mockServer, setMockServer ] = useState(null);
    
  return(
    <MockFetchContext.Provider 
      value = {{
        mockServer: [ mockServer, setMockServer ]
      }}
    >
      {children}
    </MockFetchContext.Provider>
  );
};