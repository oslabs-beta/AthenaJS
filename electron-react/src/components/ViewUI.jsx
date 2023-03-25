import React, { useState, useContext, useEffect, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import fetchMock from 'fetch-mock';
import { Resizable } from 're-resizable';
import { CompUIContext } from './context/CompUIContext';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NavContainerUI from '@/components/NavContainerUI';
import ReactFlowComp from './ReactFlowComp';

const nodeTypes = {customComp: ReactFlowComp};

const ViewUI = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const addNode = (component) => {
    return setNodes([...nodes, { id: component.name, type: 'customComp', position: { x: 200, y: 200 }, data: {component}}]);
  };

  const removeNode = (component) => {
    return setNodes(nodes.filter((node) => node.id !== component.name));
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
        >
          <Controls />
        </ReactFlow>
      </Resizable>
      <NavContainerUI removeNode = {removeNode} addNode = {addNode}/>
    </>
  );
};

export default ViewUI;