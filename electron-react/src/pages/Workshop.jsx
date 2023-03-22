import React, { useContext } from 'react';
import { DetailsContext } from '@/components/context/DetailsContext';
import SampleButton from '@/components/SampleButton';
import NavigationContainer from '@/components/NavigationContainer';
import ViewComponent from '@/components/ViewComponent';
import PerformanceCharts from '@/components/PerformanceCharts';


const Workshop = () => {
  return(
    <div id = 'workshop-page'>
      <ViewComponent />
      <NavigationContainer />
      <PerformanceCharts />
    </div>
  );

};

export default Workshop;