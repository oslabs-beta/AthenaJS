import React, {useState, useEffect, useContext} from 'react';
import { useUserCompContext } from '@/hooks/useUserCompContext';
import { DetailsContext } from './context/DetailsContext';
import { MockFetchContext } from './context/MockFetchContext';
import { PerformanceContext } from './context/PerformanceContext';
const { ipcRenderer } = require('electron');
import path from 'path';
import fs from 'fs';
const os = require('os');
// const { app } = window.require('electron').remote;

const SavedComps = () => {
  const {components, dispatch} = useUserCompContext();
  //Global state to handle component in the viewer
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  const [compPropsVal, setCompPropsVal] = compProps;
  const [compActionsVal, setCompActionsVal] = compActions;
  const [compHTMLVal, setCompHTMLVal] = compHTML;
  const [compStateVal, setCompStateVal] = compState;
  const { mockServer } = useContext(MockFetchContext);
  const [ mockServerVal, setMockServerVal ] = mockServer;

  const { keyCount } = useContext(PerformanceContext);
  const [ keyCountVal , setKeyCountVal] = keyCount;
 
  //Save component JSON
  const saveJson = () => {
    const data = components;
  
    const filePath = path.join(os.homedir(), 'AthenaData123.json');
    const json = JSON.stringify(data, null, 2);
    
    fs.writeFile(filePath, json, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err.message}`);
      } else {
        console.log(`File saved to ${filePath}`);
      }
    });
  };
  
  //Render the selected component
  const renderComponent = (component) => {
    setCompPropsVal(component.props);
    setCompActionsVal(component.actions);
    setCompHTMLVal(component.html);
    setCompStateVal(component.state);
    setMockServerVal(component.mockServer);
    setKeyCountVal(keyCountVal + 1);
  };

  //Export file
  function handleExportClick(component) {
    const fileContent = 
    `
    import React, { useState, useEffect } from 'react';

    const ${component.name} = () => {
      ${component.state}
      ${component.props}
      ${component.actions}
      return(
        <>
          ${component.html}
        </>
      )
    }

    export default ${component.name}
    `;
    ipcRenderer.send('save-file-dialog', fileContent);
  }
    
  //Delete the selected component
  const handleDelete = (component) => {
    dispatch({type: 'DELETE_COMPS', payload: component.name});
  };

  return(
    <div className = 'saved-comp-page'>
      <h2>Saved Components</h2>
      <button onClick = {saveJson}>Save Component Library</button>
      {components.length > 0 && components.map( (component) => (
        <div key = {component.name} className = 'saved-comp-container'>
          <button onClick = {() => renderComponent(component)}>{component.name}</button>
          <button onClick = {() => handleExportClick(component)}>Export</button>
          <button onClick = {() => handleDelete(component)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default SavedComps;