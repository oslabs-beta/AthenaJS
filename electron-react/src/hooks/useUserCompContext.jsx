import React, { useContext } from 'react';
import { UserCompContext } from '@/components/context/UserCompContext';


export const useUserCompContext = () => {
  const context = useContext(UserCompContext);
  
  if (!context) {
    throw Error('useUserCompContext must be used inside a UserCompContextProvider');
  }

  return context;
};