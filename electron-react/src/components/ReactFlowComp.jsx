import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { NodeResizer } from '@reactflow/node-resizer';
import fetchMock from 'fetch-mock';
import styled from 'styled-components';
import '@reactflow/node-resizer/dist/style.css';

//Custom React Flow Component to render our saved components on the react flow UI board.
const ReactFlowComp = ({ data: { component, removeNode }, selected }) => {
  const scope = { useState, useEffect, useRef, useMemo, styled, fetchMock, component };

  const buttonStyle = {
    position: 'absolute',
    top: '-25px',
    right: '-20px',
    cursor: 'pointer',
    padding: '0px',
    color: 'red',
    fontWeight: 'bold',
    fontSize: '2rem',
  };

  const handleRemoveNode = () => {
    removeNode(component);
  };

  return (
    <>
      {selected && (
        <div style={buttonStyle} onClick={handleRemoveNode}>
          <span>&times;</span>
        </div>
      )}
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <LiveProvider code={`() => {${component.mockServer}${component.body}return(${component.jsx})}`} scope={scope}>
        <LivePreview />
      </LiveProvider>
    </>
  );
};

export default ReactFlowComp;