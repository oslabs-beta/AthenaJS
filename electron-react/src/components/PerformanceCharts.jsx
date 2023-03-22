import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { PerformanceContext } from './context/PerformanceContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

  if (profilerData.length > 0){
    return(
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
          title: {
            display: true,
            text: 'Component Render Times',
            fontSize: 25
          },
          legend: {
            display: true,
            position: 'right'
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  precision: 0
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Sales'
                }
              }
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Month'
                }
              }
            ]
          }
        }}
      />
    );
  }
  else{
    return(
      <>
        <h2>Save Render Data to Generate Bar Graph</h2>
      </>
    )
  }
};

export default PerformanceCharts;