import React, { useContext, useState } from 'react';
import { ShowUIContext } from '../context/ShowUIContext';
import { motion } from 'framer-motion';


const NavBar = ({handleToggleWindow}) => {
  const { showUI } = useContext(ShowUIContext);
  const [ showUIVal, setShowUIVal ] = showUI;

  return (
    <motion.nav 
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 2 }}
      className='navbar'
    >
      <ul>
        <motion.li     
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 1,
            scale: [1, 1.1, 1],}}
          transition={{ duration: 1, delay: 2 }}
          className="nav-link"><a href='#' onClick = {handleToggleWindow.props}>Edit Components</a>
        </motion.li>
        <motion.li 
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 1,
            scale: [1, 1.1, 1],}}
          transition={{ duration: 1, delay: 2 }}
          className="nav-link">
          <a href='#' onClick={handleToggleWindow.savedComps}>Saved Components</a>
        </motion.li>
        <motion.li 
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 1,
            scale: [1, 1.1, 1],}}
          transition={{ duration: 1, delay: 2 }}
          className="nav-link">
          <a href='#' onClick={handleToggleWindow.performance}>Performance</a>
        </motion.li>
        <motion.li 
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 1,
            scale: [1, 1.1, 1],}}
          transition={{ duration: 1, delay: 2 }}
          className = 'nav-link'>
          <a href='#' onClick={() => setShowUIVal(true)}>UI Mode</a> 
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default NavBar;