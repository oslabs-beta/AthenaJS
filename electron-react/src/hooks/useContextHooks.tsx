import React, { useContext } from 'react';
import { UserCompContext } from '@/components/context/UserCompContext';
import { PerformanceContext } from '@/components/context/PerformanceContext';
import { MockFetchContext } from '@/components/context/MockFetchContext';
import { DetailsContext } from '@/components/context/DetailsContext';
import { ShowUIContext } from '@/components/context/ShowUIContext';

// custom hook to perform runtime check on PerformanceContext output
// these have to be separate error checks for each context for typescript runtime checking
export const useUserComp = () => {
  const context = useContext(UserCompContext);
  
  if (!context) {
    throw Error(`UserCompContext must be used inside a UserCompContext.Provider`);
  }

  return context;
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);

  if (!context) {
    throw Error(`PerformanceContext must be used inside a PerformanceContext.Provider`);
  }

  return context;
};

export const useMockFetch = () => {
  const context = useContext(MockFetchContext);

  if (!context) {
    throw Error(`MockFetchContext must be used inside a MockFetchContext.Provider`);
  }

  return context;
};

export const useDetails = () => {
  const context = useContext(DetailsContext);

  if (!context) {
    throw Error(`DetailsContext must be used inside a DetailsContext.Provider`);
  }

  return context;
};

export const useShowUI = () => {
  const context = useContext(ShowUIContext);

  if (!context) {
    throw Error(`ShowUIContext must be used inside a ShowUIContext.Provider`);
  }

  return context;
};
