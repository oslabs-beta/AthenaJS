// import Update from '@/components/update'
import React, { useContext, useEffect } from 'react';
import Workshop from './pages/Workshop'
import UIPage from './pages/UIPage'
import { DetailsProvider } from './components/context/DetailsContext'
import { PerformanceProvider } from './components/context/PerformanceContext'
import { CompUIProvider } from './components/context/CompUIContext';
import { useUserCompContext } from './hooks/useUserCompContext';
import './App.scss'
import FileExplorer from './components/FileExplorer'
import { MockFetchProvider } from './components/context/MockFetchContext'
import { ShowUIContext } from './components/context/ShowUIContext'
import AthenaLogo from './assets/athena_logo01.png';
import path from 'path';
import fs from 'fs';
const os = require('os');

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
      <div className = 'App'>
        <img id = 'athena-logo' src = {AthenaLogo}/>
          <CompUIProvider>
            <UIPage/>
          </CompUIProvider> 
      </div>
    )
  }
  
  else{ return (
    <div className='App'>
      <img id = 'athena-logo' src = {AthenaLogo}/>
            <DetailsProvider>
              <FileExplorer />
              <PerformanceProvider>
                <MockFetchProvider>
                  <Workshop />
                </MockFetchProvider>
              </PerformanceProvider>
            </DetailsProvider>
    </div>
  )
  }
}

export default App
