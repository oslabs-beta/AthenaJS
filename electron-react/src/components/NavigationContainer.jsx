import React, { useContext, useState } from 'react';
import { DetailsContext } from './context/DetailsContext';
import PropsWindow from './PropsWindow';
import NavBar from './NavBar';
import PerformanceCharts from './PerformanceCharts';
import SavedComps from './SavedComps';

const NavigationContainer = () => {
  const { compActions } = useContext(DetailsContext);
  const [ showPropsWindow, setShowPropsWindow ] = useState(true);
  const [ showPerformanceCharts, setShowPerformanceCharts ] = useState(false);
  const [ showSavedComps, setShowSavedComps ] = useState(false);
  // console.log(`logs are in NavigationContainer: ${logs}`);
  const handleToggleWindow = {
    props : (e) => {
      setShowPropsWindow(true);
      setShowPerformanceCharts(false);
      setShowSavedComps(false);
    },
    performance : (e) => {
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
    <div id ="navigation-container">
      <NavBar handleToggleWindow = {handleToggleWindow} />
      <div id = 'navigation-area'>
        {showPropsWindow && <PropsWindow/>}
        {showSavedComps && <SavedComps/>}
        {showPerformanceCharts && <PerformanceCharts/>}
      </div>
    </div>
  )
}

export default NavigationContainer;