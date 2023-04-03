import React, { useContext } from 'react';
import NavigationContainer from '@/components/Navigation/NavigationContainer';
import ViewComponent from '@/components/WorkshopMain/ViewComponent';
import AthenaLogoSvg from '@/components/framerMotion/AthenaLogo';

const Workshop = () => {
  return(
    <div id = 'workshop-page'>
      <AthenaLogoSvg/>
      {/* <AthenaSvg/> */}
      <ViewComponent />
      <NavigationContainer />
    </div>
  );

};

export default Workshop;