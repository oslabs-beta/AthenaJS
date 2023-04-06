import React, { useContext, useState } from 'react';
import { ShowUIContext } from '../context/ShowUIContext';
import { motion } from 'framer-motion';
import { useShowUI } from '@/hooks/useContextHooks';


const NavBarUI: React.FC = () => {
  const [showUIVal, setShowUIVal] = useShowUI();
  return (
    <motion.nav
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.5 }}
      className='navbar'>
      <ul>
        <motion.li
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 1, delay: 2 }}
          className='nav-link'>
          <a href='#' onClick={() => setShowUIVal && setShowUIVal(false)}>Component Mode</a>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default NavBarUI;