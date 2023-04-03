import React, { useContext } from 'react';
import ViewUI from '@/components/UIWindow/ViewUI';
import AthenaLogoSvg from '@/components/framerMotion/AthenaLogo';

const UIPage = () => {
  return(
    <div id = 'ui-page'>
      <AthenaLogoSvg/>
      <ViewUI />
    </div>
  );

};

export default UIPage;