import React, { useContext } from 'react';
import { DetailsContext } from '@/components/context/DetailsContext';
import NavigationContainer from '@/components/NavigationContainer';
import ViewComponent from '@/components/ViewComponent';


const Workshop = () => {
  return(
    <div id = 'workshop-page'>
      <ViewComponent />
      <NavigationContainer />
    </div>
  );

};

export default Workshop;