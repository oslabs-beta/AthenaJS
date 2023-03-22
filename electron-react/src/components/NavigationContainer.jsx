import React, { useContext, useState } from 'react';
import { DetailsContext } from './context/DetailsContext';
import PropsWindow from './PropsWindow'
import NavBar from './NavBar';
import useActions from '@/hooks/useActions';
import PerformanceCharts from './PerformanceCharts';

const NavigationContainer = () => {
  const { compActions } = useContext(DetailsContext);
  const { logs } = useActions(compActions[0]);
  const [ showPropsWindow, setShowPropsWindow ] = useState(true);
  const [ showPerformanceCharts, setShowPerformanceCharts ] = useState(false);
  // console.log(`logs are in NavigationContainer: ${logs}`);
  const handleToggleWindow = {
    props : (e) => {
      setShowPropsWindow(true);
      setShowPerformanceCharts(false);
    },
    performance : (e) => {
      setShowPerformanceCharts(true);
      setShowPropsWindow(false);
    },
  };

  return (
    <div id ="navigation-container">
      <NavBar handleToggleWindow = {handleToggleWindow} />
      <div id = 'navigation-area'>
        {showPropsWindow && <PropsWindow/>}
        {showPerformanceCharts && <PerformanceCharts/>}
        {/* <div className = 'actions'>
          <h3>Actions</h3>
          <hr></hr>
          {logs.map((log, index) => (
            <p key = {index}>
              {log.action} called
            </p>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default NavigationContainer;