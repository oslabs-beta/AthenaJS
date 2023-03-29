import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { NodeResizer } from '@reactflow/node-resizer';
import fetchMock from 'fetch-mock';
import styled from 'styled-components';
import '@reactflow/node-resizer/dist/style.css';

//Custom React Flow Component to render our saved components on the react flow UI board.
const ReactFlowComp = ({ data, selected }) => {
  const { component } = data;
  const scope = {useState, useEffect, useRef, useMemo, styled, fetchMock};

  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <LiveProvider code = {
        `() => {
            ${component.mockServer}
            ${component.state}
            ${component.actions}
            ${component.props}
            return(
            <>
                ${component.html}
            </>
            )
        }`
      }
      scope = {scope}>
        <LivePreview/>
      </LiveProvider>
    </>
  );
};

export default ReactFlowComp;
