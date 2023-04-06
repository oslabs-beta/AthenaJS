import React, { useContext } from 'react';
import { UserCompContext } from '@/components/context/UserCompContext';
import { PerformanceContext } from '@/components/context/PerformanceContext';
import { MockFetchContext } from '@/components/context/MockFetchContext';
import { DetailsContext } from '@/components/context/DetailsContext';
import { ShowUIContext } from '@/components/context/ShowUIContext';

// TODO add return typing to useContextChecker 
const useContextChecker = (reactContext: React.Context<any> , contextName: String) => {
  const context = useContext(reactContext);

  if (!context) {
    throw Error(`${contextName} must be used inside a ${contextName}.Provider`);
  }

  return context;
};

// custom hook to perform runtime check on PerformanceContext output
export const useUserComp = () => useContextChecker(UserCompContext, 'UserCompContext');
export const usePerformance = () => useContextChecker(PerformanceContext, 'PerformanceContext');
export const useMockFetch = () => useContextChecker(MockFetchContext, 'MockFetchContext');
export const useDetails = () => useContextChecker(DetailsContext, 'DetailsContext');
export const useShowUI = () => useContextChecker(ShowUIContext, 'ShowUIContext');
