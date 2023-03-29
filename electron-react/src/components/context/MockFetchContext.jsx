import React, { useState, createContext } from 'react';

export const MockFetchContext = createContext();

export const MockFetchProvider = ({ children }) => {
  //mockFetch information, initially set to null in case the user does not want to use a mock server
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