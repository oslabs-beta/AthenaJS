import React from 'react';
import { render, screen } from '@testing-library/react';
import PerformanceCharts from '../PerformanceCharts';
import '@testing-library/jest-dom';

// Mock implementation of usePerformance
const mockUsePerformance = jest.fn(() => ({
  performanceData: [
    {
      actualDuration: 100,
      renderName: 'Component A',
    },
    {
      actualDuration: 200,
      renderName: 'Component B',
    },
  ],
}));

// Mock the usePerformance hook
jest.mock('../../../hooks/useContextHooks', () => ({
  usePerformance: jest.fn(),
}));

describe('PerformanceCharts', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    mockUsePerformance.mockClear();

    // Set the mock implementation for usePerformance
    usePerformance.mockImplementation(() => mockUsePerformance());
  });

  afterEach(() => {
    // Restore the original implementation after each test
    jest.restoreAllMocks();
  });

  it('renders PerformanceCharts component', () => {
    render(<PerformanceCharts />);
    
    // Check if usePerformance was called
    expect(usePerformance).toHaveBeenCalled();

    // Check if the chart was rendered
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});