import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBarUI from '../NavBarUI';
import { ShowUIContext } from '../../context/ShowUIContext';
import '@testing-library/jest-dom';


describe('NavBarUI', () => {
  it('should render a nav element', () => {
    const { getByRole } = render(<NavBarUI />);
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('should render a list item with a link', () => {
    const { getByRole } = render(<NavBarUI />);
    expect(getByRole('listitem')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
  });

  it('should call the setShowUIVal function when link is clicked', () => {
    const setShowUIVal = jest.fn();
    const { getByRole } = render(<NavBarUI />, {
      wrapper: ({ children }) => (
        <ShowUIContext.Provider value={{ showUI: [true, setShowUIVal] }}>
          {children}
        </ShowUIContext.Provider>
      ),
    });
    const link = getByRole('link');
    fireEvent.click(link);
    expect(setShowUIVal).toHaveBeenCalledWith(false);
  });
});
