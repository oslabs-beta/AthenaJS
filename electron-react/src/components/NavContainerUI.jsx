import React, { useContext, useState } from 'react';
import NavBarUI from './NavBarUI';
import UIComps from './UIComps';


const NavContainerUI = ({bg, addNode, removeNode}) => {

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