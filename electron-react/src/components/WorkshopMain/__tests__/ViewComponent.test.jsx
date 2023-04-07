import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PerformanceCharts from '../PerformanceCharts';
import { PerformanceContext } from '../../context/PerformanceContext';
import '@testing-library/jest-dom';

/**
 * should display a render time
 *  with data
 *  not without data
 * should be able to input a render name
 * should have a button that will update the graph 
 * should render an element 
 *  from a context
 */

xdescribe('ViewComponent component', () => {
  test('display a render time', () => {
    const testData = [];
    const contextValue = [];
    render(
      
    );
    const something = screen.getByAltText('');
    expect(something).toBeInTheDocument();
  });
});