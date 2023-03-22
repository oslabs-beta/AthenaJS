import React, { useState, createContext } from 'react';

export const MockFetchContext = createContext();

export const MockFetchProvider = ({ children }) => {
  const [ fetchMethod, setFetchMethod ] = useState('get');
  const [ fetchURL, setFetchURL ] = useState('/api/data');
  const [ fetchOptions, setFetchOptions ] = useState({"data": "mocked data"});
    
  return(
    <MockFetchContext.Provider 
      value = {{
        fetchMethod: [ fetchMethod, setFetchMethod ],
        fetchURL: [ fetchURL, setFetchURL ],
        fetchOptions: [ fetchOptions, setFetchOptions ]
      }}
    >
      {children}
    </MockFetchContext.Provider>
  );
};