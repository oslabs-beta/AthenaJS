import React, { useContext } from 'react';
import { DetailsContext } from '@/components/context/DetailsContext';
import NavigationContainer from '@/components/NavigationContainer';
import ViewComponent from '@/components/ViewComponent';
import { motion } from 'framer-motion';
import AthenaSvg from '@/components/AthenaSvg';



const Workshop = () => {
  return(
    <div id = 'workshop-page'>
      <AthenaSvg/>
      <ViewComponent />
      <NavigationContainer />
    </div>
  );

};

export default Workshop;