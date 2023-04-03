import React, {useState, useEffect, useContext} from 'react';
import { useUserCompContext } from '@/hooks/useUserCompContext';
import { DetailsContext } from '../context/DetailsContext';
import { MockFetchContext } from '../context/MockFetchContext';
import { PerformanceContext } from '../context/PerformanceContext';
const { ipcRenderer } = require('electron');
import path from 'path';
import fs from 'fs';
const os = require('os');
import {motion} from 'framer-motion';

const transition = {
  type: "spring",
  damping: 30,
  stiffness: 300,
  duration: 1
};

const SavedComps = () => {
  const {components, dispatch} = useUserCompContext();
  //Global state to handle component in the viewer
  const { compBody, compJSX, tempCompBody, tempCompJSX } = useContext(DetailsContext);
  const [compBodyVal, setCompBodyVal] = compBody;
  const [compJSXVal, setCompJSXVal] = compJSX;
  const [ tempCompBodVal, setTempCompBodyVal ] = tempCompBody;
  const [ tempCompJSXVal, setTempCompJSXVal ] = tempCompJSX;
  const { mockServer } = useContext(MockFetchContext);
  const [ mockServerVal, setMockServerVal ] = mockServer;

  const { keyCount } = useContext(PerformanceContext);
  const [ keyCountVal , setKeyCountVal] = keyCount;
 
  //Save component JSON
  const saveJson = () => {
    const data = components;
    //file AthenaData123.json in home directory
    const filePath = path.join(os.homedir(), 'AthenaData123.json');
    //Stringify the data
    const json = JSON.stringify(data, null, 2);
    //save the json to the file
    fs.writeFile(filePath, json, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err.message}`);
      } else {
        console.log(`File saved to ${filePath}`);
      }
    });
  };
  
  //Render the selected component by setting the states that the renderer uses
  const renderComponent = (component) => {
    setCompBodyVal(component.body);
    setCompJSXVal(component.jsx);
    setTempCompBodyVal(component.body);
    setTempCompJSXVal(component.jsx);
    setMockServerVal(component.mockServer);
    setTimeout(() => {setKeyCountVal(keyCountVal + 1)}, 0);
  };

  //Export file as JSX (we build the component in the template literal)
  function handleExportClick(component) {
    const fileContent = 
    `
    import React, { useState, useEffect } from 'react';

    const ${component.name} = () => {
      ${component.body}
      return(
        <>
          ${component.jsx}
        </>
      )
    }

    export default ${component.name}
    `;
    //Check electron/main/index.tsx at the bottom to see logic for this
    ipcRenderer.send('save-file-dialog', fileContent);
  }
    
  //Delete the selected component
  const handleDelete = (component) => {
    dispatch({type: 'DELETE_COMPS', payload: component.name});
  };

  return(
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={transition}
      className = 'saved-comp-page'
    >
      <h1>Component Library</h1><br/>
      <button id = 'save-library' onClick = {saveJson}>Save Library</button>
      <div className = 'saved-comps'>
        {components.length > 0 && components.map( (component) => (
          <div key = {component.name} className = 'saved-comp-container'>
            <span className = 'comp-container-name'>{component.name}</span>
            <button className = 'render-comp-button' onClick = {() => renderComponent(component)}>Render</button>
            <button className = 'export-comp-button' onClick = {() => handleExportClick(component)}>Export</button>
            <button className = 'delete-comp-button' onClick = {() => handleDelete(component)}>Delete</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SavedComps;