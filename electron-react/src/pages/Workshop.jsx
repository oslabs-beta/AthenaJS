import React, { useContext } from 'react';
import { DetailsContext } from '@/components/context/DetailsContext';
import SampleButton from '@/components/SampleButton';
import PropsWindow from '@/components/PropsWindow';
import ViewComponent from '@/components/ViewComponent';


const Workshop = () => {
  return(
    <div id = 'workshop-page'>
      <PropsWindow/>
      <ViewComponent/>
    </div>
  );

};

export default Workshop;