import React, { Profiler, useContext, useState, useEffect } from 'react';
import { DetailsContext } from './context/DetailsContext';
import { PerformanceContext } from './context/PerformanceContext';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import fetchMock from 'fetch-mock';
import stringifyObject from 'stringify-object';
import { MockFetchContext } from './context/MockFetchContext';
import { Resizable } from 're-resizable';



const ViewComponent = () => {
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  const { mockServer } = useContext(MockFetchContext);
  const { keyCount, performanceData } = useContext(PerformanceContext);
  const [ performanceDataArr, setPerformanceDataArr] = performanceData;
  const [ profilerData, setProfilerData ] = useState(null);
  const [ renderName, setRenderName ] = useState('');

  const handleProfilerData = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
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


  const updateGraph = () => {
    setPerformanceDataArr([...performanceDataArr, {renderName: renderName, ...profilerData}]);
  };

  // fetchMock.mock('*', {data: 'mock data'}, { overwriteRoutes: true });
  // React.useEffect(() => {
  // async function getData(){
  // const res = await fetch('/api/users')
  // const data = await res.json()
  // if (res.ok) console.log(data.data)
  // }
  // getData()
  // }, [])

  const string = `() => {
    ${mockServer[0]}
    ${compState[0]}
    ${compActions[0]}
    ${compProps[0]}
    return(  
      <>
      ${compHTML[0]}
      </>
    )
      }`;

  let scope = {};
  if (mockServer[0]) scope = {fetchMock};

  return (
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
      <div id="navigation-area">
        {/* Actions: {stringifyObject(compActions[0])} <br/> */}
          Props: {compProps[0]} <br/>
          State: {compState[0]} <br/>
          Render Time: {profilerData ? profilerData.actualDuration.toFixed(3) + ' ms' : 'N/A'}
        <LiveProvider code={string} scope = {scope}>
          <Profiler key={keyCount[0]} id = 'preview-component' onRender={handleProfilerData}>
            <LivePreview/>
          </Profiler>
          <LiveError />
        </LiveProvider>
        <input
          onChange = {(e) => setRenderName(e.target.value)}
          value = {renderName}
          placeholder = 'Render Name'
        />
        <button onClick={updateGraph}>Add Render Data</button>
      </div>
    </Resizable>
  );
};

export default ViewComponent;