import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PerformanceCharts from '../PerformanceCharts';
import { PerformanceContext, PerformanceProvider } from '../../context/PerformanceContext';
import '@testing-library/jest-dom';

//Need to fix this test file, there are some issues with Chart.js using an object not available within the test
//Look into Canvas

describe('PerformanceCharts', () => {
  it('renders the "Save Render Data" message when no data is provided', () => {
    const { getByText } = render(
      <PerformanceProvider>
        <PerformanceCharts />
      </PerformanceProvider>
    );
    expect(getByText('Save Render Data to Generate Bar Graph')).toBeInTheDocument();
  });

  it('renders a bar graph when data is provided', () => {
    const mockData = [    {      renderName: 'Render 1',      actualDuration: 2,    },    {      renderName: 'Render 2',      actualDuration: 1,    },  ];
  
    // Mock the getContext method of the canvas element
  
    // Mock the setState function for the performance data
    const setPerformanceData = jest.fn();
  
    // Render PerformanceCharts component with mock data and mock setState function
    const { getByTestId } = render(
      <PerformanceContext.Provider value={{ performanceData: [mockData, setPerformanceData] }}>
        <PerformanceCharts />
      </PerformanceContext.Provider>
    );
  
    // Assert that the chart is rendered
    expect(getByTestId('bar-chart')).toBeInTheDocument();
  });

})
