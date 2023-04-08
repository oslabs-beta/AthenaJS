import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBar from '../NavBar';
import '@testing-library/jest-dom';


describe('NavBar component', () => {
  it('should render all nav links', () => {
    const { getByText } = render(<NavBar handleToggleWindow={{ props: jest.fn(), savedComps: jest.fn(), performance: jest.fn() }} />);
    expect(getByText('Edit Components')).toBeInTheDocument();
    expect(getByText('Saved Components')).toBeInTheDocument();
    expect(getByText('Performance')).toBeInTheDocument();
    expect(getByText('UI Mode')).toBeInTheDocument();
  });

  it('should call handleToggleWindow function when nav links are clicked', () => {
    const mockHandleToggleWindow = { props: jest.fn(), savedComps: jest.fn(), performance: jest.fn() };
    const { getByText } = render(<NavBar handleToggleWindow={mockHandleToggleWindow} />);
    fireEvent.click(getByText('Edit Components'));
    expect(mockHandleToggleWindow.props).toHaveBeenCalled();
    fireEvent.click(getByText('Saved Components'));
    expect(mockHandleToggleWindow.savedComps).toHaveBeenCalled();
    fireEvent.click(getByText('Performance'));
    expect(mockHandleToggleWindow.performance).toHaveBeenCalled();
  });
});