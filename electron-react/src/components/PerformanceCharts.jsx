import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { PerformanceContext } from './context/PerformanceContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);


const PerformanceCharts = () => {
  const { performanceData } = useContext(PerformanceContext);
  const [ profilerData, setProfilerData ] = performanceData;

  const getActualDurationData = () => {
    return performanceData[0].map((data) => data.actualDuration);
  };
  const getIds = () => {
    return performanceData[0].map((data) => data.renderName);
  };

  const handleUndo = () => {
    setProfilerData(profilerData.slice(0,profilerData.length - 1));
  };

  const handleReset = () => {
    setProfilerData([]);
  };

  if (profilerData.length > 0){
    return(
      <div className = 'graph-page'>
        <h3>Component Render Times (ms)</h3>
        <Bar
          data={{
            labels: getIds(),
            datasets: [
              {
                label: 'Render Speed (ms)',
                data: getActualDurationData(),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)'
                ]
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            height: 1000,
            width: 1000,
            title: {
              display: true,
              text: 'Component Render Times',
              fontSize: 25
            },
          }}
        />
        <button onClick = {handleReset}>Reset Chart</button>
        <button onClick = {handleUndo}>Undo</button>
      </div>
    );
  }
  else{
    return(
      <>
        <h2>Save Render Data to Generate Bar Graph</h2>
      </>
    );
  }
};

export default PerformanceCharts;