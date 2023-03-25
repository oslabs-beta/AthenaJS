import React, { useContext, useState } from 'react';
import { ShowUIContext } from './context/ShowUIContext';


const NavBarUI = () => {
  const { showUI } = useContext(ShowUIContext);
  const [ showUIVal, setShowUIVal ] = showUI;
  return (
    <nav className='navbar'>
      <ul>
        <li className = 'nav-link'><a href='#' onClick={() => setShowUIVal(false)}>Component Mode</a> </li>
      </ul>
    </nav>
  );
};

export default NavBarUI;