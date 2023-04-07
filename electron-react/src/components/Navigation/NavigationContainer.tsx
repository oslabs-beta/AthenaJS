import React, { useContext, useState } from 'react';
import PropsWindow from '../WorkshopMain/PropsWindow';
import NavBar from './NavBar';
import PerformanceCharts from '../WorkshopMain/PerformanceCharts';
import SavedComps from '../WorkshopMain/SavedComps';
import { NavigationContainerProps, handleToggleWindow } from './NavTypes';


const NavigationContainer: React.FC = () => {
  const [showPropsWindow, setShowPropsWindow] = useState<boolean>(true);
  const [showPerformanceCharts, setShowPerformanceCharts] = useState<boolean>(false);
  const [showSavedComps, setShowSavedComps] = useState<boolean>(false);
  // console.log(`logs are in NavigationContainer: ${logs}`);
  const handleToggleWindow: handleToggleWindow = {
    props: (e) => {
      setShowPropsWindow(true);
      setShowPerformanceCharts(false);
      setShowSavedComps(false);
    },
    performance: (e) => {
      setShowPerformanceCharts(true);
      setShowPropsWindow(false);
      setShowSavedComps(false);
    },
    savedComps: (e) => {
      setShowSavedComps(true);
      setShowPerformanceCharts(false);
      setShowPropsWindow(false);
    }
  };

  return (
    <div id="navigation-container">
      <NavBar handleToggleWindow={handleToggleWindow} />
      <div id='navigation-area'>
        {showPropsWindow && <PropsWindow />}
        {showSavedComps && <SavedComps />}
        {showPerformanceCharts && <PerformanceCharts />}
      </div>
    </div>
  )
}

export default NavigationContainer;