import React, { useState, createContext } from 'react';

export const PerformanceContext = createContext();

//These are the states used with the react profiler API to store render data that is saved.  This data is then charted using Chart.js in PerformanceCharts.jsx
export const PerformanceProvider = ({ children }) => {
  //This state holds the performance data that gets graphed
  const [ performanceData, setPerformanceData ] = useState([]);
  //This state changes the key of the react profiler component to force a remount and get a new render time for the mounting event.
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