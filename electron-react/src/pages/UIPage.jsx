import React, { useContext } from 'react';
import NavigationContainer from '@/components/NavigationContainer';
import ViewUI from '@/components/ViewUI';
import NavContainerUI from '@/components/NavContainerUI';
import AthenaLogoSvg from '@/components/AthenaLogo';

const UIPage = () => {
  return(
    <div id = 'ui-page'>
      <AthenaLogoSvg/>
      <ViewUI />
    </div>
  );

};

export default UIPage;