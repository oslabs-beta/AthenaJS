import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { NodeResizer } from '@reactflow/node-resizer';
import fetchMock from 'fetch-mock';
import styled from 'styled-components';

const ReactFlowComp = ({ data }) => {
  const { component } = data;
  const scope = {useState, useEffect, useRef, useMemo, styled, fetchMock};

  return (
    <>
      <NodeResizer/>
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
}

export default ReactFlowComp;
