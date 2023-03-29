import React, { useState, useContext, useEffect, useMemo, useRef, useCallback } from 'react';
import { Resizable } from 're-resizable';
import ReactFlow, {
  Controls,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NavContainerUI from '@/components/NavContainerUI';
import ReactFlowComp from './ReactFlowComp';
import html2canvas from 'html2canvas';
import path from 'path';
import fs from 'fs';
const os = require('os');

const nodeTypes = {customComp: ReactFlowComp};

const ViewUI = () => {
  const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
  const [ bgColor, setBgColor ] = useState('#D0DBFE');

  const divRef = useRef(null);

  const flowStyle = {
    background: bgColor
  };

  //Add a node to the react flow UI
  const addNode = (component) => {
    return setNodes([...nodes, { id: component.name, type: 'customComp', position: { x: 200, y: 200 }, data: {component}}]);
  };

  //Remove a specific node from the react flow UI (tied to that specific components remove button in UIComps.jsx)
  const removeNode = (component) => {
    return setNodes(nodes.filter((node) => node.id !== component.name));
  };
  
  //Take a screenshot of the react flow UI div.  
  const captureScreenshot = () => {
    html2canvas(divRef.current).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const timestamp = Date.now();
      const randomNumber = Math.floor(Math.random() * 100000);
      const fileName = `AthenaScreenshot_${timestamp}_${randomNumber}.png`;
      const filePath = path.join(os.homedir(), 'Downloads', fileName);
      fs.writeFile(filePath, image.replace(/^data:image\/png;base64,/, ''), 'base64', err => {
        if (err) throw err;
        console.log(`Screenshot saved as ${fileName}`);
      });
    });
  };
  

  return(
    <>
      <Resizable
        className="navigation-area-resizable"
        defaultSize={{
          width: '100%',
          height: 'auto',
        }}
        minHeight={400} 
        maxHeight={1000} 
        enable={{
          top: false,
          right: false,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes = {nodeTypes}
          style = {flowStyle}
          ref = {divRef}
        >
          <Controls />
        </ReactFlow>
      </Resizable>
      <button className="material-icons" id = 'screenshot-btn' onClick = {captureScreenshot}> photo_camera </button>
      <NavContainerUI bg = {[ bgColor, setBgColor ]} removeNode = {removeNode} addNode = {addNode}/>
    </>
  );
};

export default ViewUI;