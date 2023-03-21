import React, { useContext } from 'react';
import { DetailsContext } from './context/DetailsContext';
import PropsWindow from './PropsWindow'
import NavBar from './NavBar';
import useActions from '@/hooks/useActions';

const NavigationContainer = () => {
  const { compActions } = useContext(DetailsContext);
  const { logs } = useActions(compActions[0]);

  // console.log(`logs are in NavigationContainer: ${logs}`);

  return (
    <div id ="navigation-container">
      <NavBar />
      <div id = 'navigation-area'>
        <PropsWindow/>
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