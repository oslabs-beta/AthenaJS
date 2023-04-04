import React, { Profiler, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { DetailsContext } from '../context/DetailsContext';
import { PerformanceContext } from '../context/PerformanceContext';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import fetchMock from 'fetch-mock';
import styled from 'styled-components';
import { MockFetchContext } from '../context/MockFetchContext';
import { Resizable } from 're-resizable';
import { performanceData } from './WorkshopTypes';

const ViewComponent = () => {
  const { compBody, compJSX } = useContext(DetailsContext);
  const { mockServer } = useContext(MockFetchContext);
  const { keyCount, performanceData } = useContext(PerformanceContext);
  const [ performanceDataArr, setPerformanceDataArr] = performanceData;
  const [ profilerData, setProfilerData ] = useState<performanceData | null>(null);
  const [ renderName, setRenderName ] = useState('');
  
  // Set render data for the component being rendered.  We only measure the stats for mounting phase
  // could look in React.Profiler d.ts for the typing
  const handleProfilerData = (id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number): void => {
    if (phase === 'mount'){
      setProfilerData({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      });
    }
  };

  //If we want to add the render time to our chart, we press the button and it adds the data to the graph data array.
  const updateGraph = (): void => {
    setPerformanceDataArr([...performanceDataArr, {renderName: renderName, ...profilerData}]);
  };


//This is the code for the react component we want to render.
  const string = `() => {
    ${mockServer[0]}
    ${compBody[0]}
    return(  
      <>
      ${compJSX[0]}
      </>
    )
      }`;

  //These allow us to use common react hooks and styled + fetchMock libraries with react-live (the library we are using to render components)
  let scope = {useState, useEffect, useRef, useMemo, styled};
  // this is the typing library: @types/fetch-mock
  // @ts-ignore
  if (mockServer[0]) scope = {useState, useEffect, useRef, useMemo, styled, fetchMock};

  return (
    <>
      <div id = 'component-data'>
        <strong>Render Time:</strong> {profilerData ? profilerData.actualDuration.toFixed(3) + ' ms' : 'N/A'}<br/>
        <input
          id = 'render-name'
          onChange = {(e) => setRenderName(e.target.value)}
          value = {renderName}
          placeholder = 'Render Name'
        /><br/>
        <button id = 'add-render' onClick={updateGraph}>Add Data</button>
      </div>
      <Resizable
        className="navigation-area-resizable"
        defaultSize={{
          width: '100%',
          height: 'auto',
        }}
        minHeight={400} 
        maxHeight={2000} 
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
        <div id="navigation-area">
          <LiveProvider code={string} scope = {scope}>
            <Profiler key={keyCount[0]} id = 'preview-component' onRender={handleProfilerData}>
              <LivePreview/>
            </Profiler>
            <LiveError />
          </LiveProvider>
        </div>
      </Resizable>
    </>
  );
};

export default ViewComponent;