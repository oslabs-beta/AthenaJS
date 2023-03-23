import React, { useState, createContext } from 'react';

export const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
  const [ performanceData, setPerformanceData ] = useState([]);
  const [ keyCount, setKeyCount ] = useState(0);
    
  return(
    <PerformanceContext.Provider 
      value = {{
        performanceData: [performanceData, setPerformanceData ],
        keyCount: [ keyCount, setKeyCount ]
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};