import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

interface MockFetchContextType {
  mockServer:(string | Dispatch<SetStateAction<null>>| null)[]
}

export const MockFetchContext = createContext<MockFetchContextType | null>(null);

export const MockFetchProvider = ({ children } : any) => {
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