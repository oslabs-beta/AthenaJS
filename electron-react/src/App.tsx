// import Update from '@/components/update'
import React, { useContext, useEffect } from 'react';
import Workshop from './pages/Workshop';
import UIPage from './pages/UIPage';
import { DetailsProvider } from './components/context/DetailsContext';
import { PerformanceProvider } from './components/context/PerformanceContext';
import { CompUIProvider } from './components/context/CompUIContext';
import { useUserCompContext } from './hooks/useUserCompContext';
import './App.scss';
import FileExplorer from './components/FileExplorer';
import { MockFetchProvider } from './components/context/MockFetchContext';
import { ShowUIContext } from './components/context/ShowUIContext';
import {motion} from 'framer-motion';
import path from 'path';
import fs from 'fs';
const os = require('os');

const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 800,
      damping: 100,
      duration: 1
    }
  },
  exit: {
    opacity: 0,
    y: -100,
    scale: 1.2,
    transition: {
      duration: 1
    }
  }
};

function App() {
  const { showUI } = useContext(ShowUIContext)
  const [ showUIVal, setShowUIVal ] = showUI
  const {components, dispatch} = useUserCompContext();


  useEffect(() => {
    const filePath = path.join(os.homedir(), 'AthenaData123.json');

    // Read the file's contents
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
      } else {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        // Set user components
        dispatch({type: 'SET_COMPS', payload: jsonData});
      }
    });
  }, []);

  if (showUIVal){
    return(
      <motion.div 
      key={1}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
        className = 'App'
      >
          <CompUIProvider>
            <UIPage/>
          </CompUIProvider> 
      </motion.div>
    )
  }
  
  else{ return (
    <motion.div 
    key={2}
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
      className='App'
    >
            <DetailsProvider>
              <FileExplorer />
              <PerformanceProvider>
                <MockFetchProvider>
                  <Workshop />
                </MockFetchProvider>
              </PerformanceProvider>
            </DetailsProvider>
    </motion.div>
  )
  }
}

export default App
