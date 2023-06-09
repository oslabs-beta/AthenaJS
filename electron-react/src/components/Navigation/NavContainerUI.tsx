import React, { useContext, useState } from 'react';
import NavBarUI from './NavBarUI';
import UIComps from '../UIWindow/UIComps';
import { NavContainerUiProps } from './NavTypes';


const NavContainerUI: React.FC<NavContainerUiProps> = ({bg, addNode, removeNode}) => {

  return (
    <div id ="navigation-container">
      <NavBarUI />
      <div id = 'navigation-area'>
        <UIComps bg = {bg} removeNode = {removeNode} addNode = {addNode} />
      </div>
    </div>
  );
};

export default NavContainerUI;