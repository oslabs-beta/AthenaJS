import React, { useContext } from 'react';
import { DetailsContext } from '@/components/context/DetailsContext';
import SampleButton from '@/components/SampleButton';
import NavigationContainer from '@/components/NavigationContainer';
import ViewComponent from '@/components/ViewComponent';


const Workshop = () => {
  const { compProps, compActions, compHTML } = useContext(DetailsContext);
  return(
    <div id = 'workshop-page'>
      <ViewComponent />
      <NavigationContainer />
    </div>
  );

};

export default Workshop;