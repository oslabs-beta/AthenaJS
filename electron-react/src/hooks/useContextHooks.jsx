import React, { useContext } from 'react';
import { UserCompContext } from '@/components/context/UserCompContext';
import { PerformanceContext } from '@/components/context/PerformanceContext';
import { MockFetchContext } from '@/components/context/MockFetchContext';
import { DetailsContext } from '@/components/context/DetailsContext';

//Easy way to use reducer and state for user component library
export const useUserComp = () => {
  const context = useContext(UserCompContext);
  
  if (!context) {
    throw Error('useUserCompContext must be used inside a UserCompContextProvider');
  }

  return context;
};

// custom hook to perform runtime check on PerformanceContext output
export const usePerformance = () => {
  const performanceContext = useContext(PerformanceContext);

  if (!performanceContext) {
    throw new Error(
      'performanceContext has to be used within <PerformanceContext.Provider>'
    );
  }

  return performanceContext;
};

export const useMockFetch = () => {
  const mockFetchContext = useContext(MockFetchContext);

  if (!mockFetchContext) {
    throw new Error(
      'mockFetchContext has to be used within <MockFetch.Provider>'
    );
  }

  return mockFetchContext;
};

export const useDetails = () => {
  const detailsContext = useContext(DetailsContext);

  if (!detailsContext) {
    throw new Error(
      'detailsContext has to be used within <DetailsContext.Provider>'
    );
  }

  return detailsContext;
};