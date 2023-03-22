import React, { Profiler, useContext, useState, useEffect } from 'react';
import { DetailsContext } from './context/DetailsContext';
import { PerformanceContext } from './context/PerformanceContext';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import stringifyObject from 'stringify-object';


const ViewComponent = () => {
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  const { performanceData } = useContext(PerformanceContext);
  const [ performanceDataArr, setPerformanceDataArr] = performanceData;
  const [ profilerData, setProfilerData ] = useState(null);

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
    setPerformanceDataArr([...performanceDataArr, profilerData]);
  };


  console.log(profilerData);

  const string = `() => {
    ${compState[0]}
    ${compActions[0]}
    ${compProps[0]}
    return(  
    <>
      ${compHTML[0]}
    </>
    )
      }`;

 

  return (
    <div id='navigation-area'>
      {/* Actions: {stringifyObject(compActions[0])} <br/> */}
      Props: {compProps[0]} <br/>
      State: {compState[0]} <br/>
      Render Time: {profilerData ? profilerData.actualDuration.toFixed(3) + ' ms' : 'N/A'}
      <LiveProvider code= {string}>
        <Profiler id = 'preview-component' onRender={handleProfilerData}>
          <LivePreview />
        </Profiler>
        <LiveError />
      </LiveProvider>
      <button onClick = {updateGraph}>Add Render Data</button>
    </div>
);
};

export default ViewComponent;