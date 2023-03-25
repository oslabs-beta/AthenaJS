// import Update from '@/components/update'
import React, { useContext } from 'react';
import Workshop from './pages/Workshop'
import UIPage from './pages/UIPage'
import { DetailsProvider } from './components/context/DetailsContext'
import { PerformanceProvider } from './components/context/PerformanceContext'
import { CompUIProvider } from './components/context/CompUIContext';
import './App.scss'
import FileExplorer from './components/FileExplorer'
import { MockFetchProvider } from './components/context/MockFetchContext'
import { ShowUIContext } from './components/context/ShowUIContext'
import AthenaLogo from './assets/athena_logo01.png';

function App() {
  const { showUI } = useContext(ShowUIContext)
  const [ showUIVal, setShowUIVal ] = showUI


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
