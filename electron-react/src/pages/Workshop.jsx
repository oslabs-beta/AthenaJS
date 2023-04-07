import React, { useContext } from 'react';
import NavigationContainer from '@/components/Navigation/NavigationContainer';
import ViewComponent from '@/components/WorkshopMain/ViewComponent';
import { Resizable } from 're-resizable';

const Workshop = () => {
  return(
    <div id = 'workshop-page'>
      <ViewComponent />
      <Resizable
      className="navigation-area-resizable"
      defaultSize={{
        width: '100%',
        height: 'auto',
      }}
      minHeight={'30vh'} 
      maxHeight={'70vh'} 
      enable={{
        top: true,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <NavigationContainer />
    </Resizable>
    </div>
  );

};

export default Workshop;