import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PerformanceCharts from '../PerformanceCharts';
import { PerformanceProvider } from '../../context/PerformanceContext';
import '@testing-library/jest-dom';

describe('PerformanceCharts', () => {
  it('renders the "Save Render Data" message when no data is provided', () => {
    const { getByText } = render(
      <PerformanceProvider>
        <PerformanceCharts />
      </PerformanceProvider>
    );
    expect(getByText('Save Render Data to Generate Bar Graph')).toBeInTheDocument();
  });
})