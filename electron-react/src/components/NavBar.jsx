import React, { useContext, useState } from 'react';
import { ShowUIContext } from './context/ShowUIContext';


const NavBar = ({handleToggleWindow}) => {
  const { showUI } = useContext(ShowUIContext);
  const [ showUIVal, setShowUIVal ] = showUI;

  return (
    <nav className='navbar'>
      <ul>
        <li className="nav-link"><a href='#' onClick = {handleToggleWindow.props}>Edit Components</a></li>
        <li className="nav-link"><a href='#' onClick={handleToggleWindow.savedComps}>Saved Components</a></li>
        <li className="nav-link"><a href='#' onClick={handleToggleWindow.performance}>Performance</a></li>
        <li className = 'nav-link'><a href='#' onClick={() => setShowUIVal(true)}>UI Mode</a> </li>
      </ul>
    </nav>
  );
};

export default NavBar;