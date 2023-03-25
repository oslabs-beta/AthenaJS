import React, {useState, useContext} from 'react';
import { useUserCompContext } from '@/hooks/useUserCompContext';
import { CompUIContext } from './context/CompUIContext';
const { ipcRenderer } = require('electron');

const UIComps = ({addNode, removeNode}) => {
  const {components, dispatch} = useUserCompContext();
  const { compsUI } = useContext(CompUIContext);
  const [ compsUIVal, setCompsUIVal ] = compsUI;

   
  return(
    <div className = 'saved-comp-page'>
      <h2>Saved Components</h2>
      {components.length > 0 && components.map( (component) => (
        <div key = {component.name} className = 'saved-comp-container'>
          <button onClick = {() => addNode(component)}>Add {component.name}</button>
          <button onClick = {() => removeNode(component)}> Remove {component.name}</button>
        </div>
      ))}
    </div>
  );
};

export default UIComps;