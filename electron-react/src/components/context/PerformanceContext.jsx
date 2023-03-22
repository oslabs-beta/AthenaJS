import React, { useState, createContext } from 'react';

export const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
  const [performanceData, setPerformanceData] = useState([]);
    
  return(
    <PerformanceContext.Provider 
      value = {{
        performanceData: [performanceData, setPerformanceData]
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};