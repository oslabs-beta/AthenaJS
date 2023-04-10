import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DetailsContext } from '../../context/DetailsContext';
import { MockFetchContext } from '../../context/MockFetchContext';
import { PerformanceContext } from '../../context/PerformanceContext';
import { UserCompContext } from '../../context/UserCompContext';
import SavedComps from '../SavedComps';
import '@testing-library/jest-dom';

// create a mock context value
const mockComponents = [
  { name: 'Component 1', body: 'Const var1 = 1', jsx: '<div>Component JSX 1</div>', mockServer: null },
  { name: 'Component 2', body: 'Const var2 = 2', jsx: '<div>Component JSX 2</div>', mockServer: null },
];
const mockValue = {
  components: mockComponents,
  dispatch: jest.fn(),
};
const mockDetailsValue = {
  compBody: ['', jest.fn()],
  compJSX: ['', jest.fn()],
  tempCompBody: ['', jest.fn()],
  tempCompJSX: ['', jest.fn()],
};
const mockMockFetchValue = {
  mockServer: [null, jest.fn()],
};
const mockPerformanceValue = {
  keyCount: [0, jest.fn()],
};

describe('SavedComps component', () => {
  test('renders component names', () => {
    render(
      <DetailsContext.Provider value={mockDetailsValue}>
        <MockFetchContext.Provider value={mockMockFetchValue}>
          <PerformanceContext.Provider value={mockPerformanceValue}>
            <UserCompContext.Provider value={mockValue}>
              <SavedComps />
            </UserCompContext.Provider>
          </PerformanceContext.Provider>
        </MockFetchContext.Provider>
      </DetailsContext.Provider>
    );
    screen.debug()
    const comp1 = screen.getByText(/Component 1/i);
    const comp2 = screen.getByText(/Component 2/i);
    expect(comp1.textContent).toBe('Component 1');
    expect(comp2.textContent).toBe('Component 2');
  });

  test('clicking on render button displays component preview', () => {
    // test to ensure that clicking on the render button displays the component preview
    render(
      <DetailsContext.Provider value={mockDetailsValue}>
        <MockFetchContext.Provider value={mockMockFetchValue}>
          <PerformanceContext.Provider value={mockPerformanceValue}>
            <UserCompContext.Provider value={mockValue}>
              <SavedComps />
            </UserCompContext.Provider>
          </PerformanceContext.Provider>
        </MockFetchContext.Provider>
      </DetailsContext.Provider>
    );
    const comp1 = screen.getByText(/Component 1/i);
    const comp2 = screen.getByText(/Component 2/i);
    const renderButton1 = screen.getAllByText(/Render/)[0];
    const renderButton2 = screen.getAllByText(/Render/)[1];
    fireEvent.click(renderButton1);
    expect(mockMockFetchValue.mockServer[1]).toHaveBeenCalledWith(mockComponents[0].mockServer);
    fireEvent.click(renderButton2);
    expect(mockMockFetchValue.mockServer[1]).toHaveBeenCalledWith(mockComponents[1].mockServer);
  });

  
  test('calls dispatch function when delete button is clicked', () => {
    render(
      <DetailsContext.Provider value={mockDetailsValue}>
        <MockFetchContext.Provider value={mockMockFetchValue}>
          <PerformanceContext.Provider value={mockPerformanceValue}>
            <UserCompContext.Provider value={mockValue}>
              <SavedComps />
            </UserCompContext.Provider>
          </PerformanceContext.Provider>
        </MockFetchContext.Provider>
      </DetailsContext.Provider>
    );
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockValue.dispatch).toHaveBeenCalled();
  });

  test('calls details context functions when render button is clicked', () => {
    render(
      <DetailsContext.Provider value={mockDetailsValue}>
        <MockFetchContext.Provider value={mockMockFetchValue}>
          <PerformanceContext.Provider value={mockPerformanceValue}>
            <UserCompContext.Provider value={mockValue}>
              <SavedComps />
            </UserCompContext.Provider>
          </PerformanceContext.Provider>
        </MockFetchContext.Provider>
      </DetailsContext.Provider>
    );
    const renderButtons = screen.getAllByText(/render/i);
    fireEvent.click(renderButtons[0]);
    expect(mockDetailsValue.compBody[1]).toHaveBeenCalledWith(mockComponents[0].body);
    expect(mockDetailsValue.compJSX[1]).toHaveBeenCalledWith(mockComponents[0].jsx);
  });

  test('searches for component names', () => {
    render(
      <DetailsContext.Provider value={mockDetailsValue}>
        <MockFetchContext.Provider value={mockMockFetchValue}>
          <PerformanceContext.Provider value={mockPerformanceValue}>
            <UserCompContext.Provider value={mockValue}>
              <SavedComps />
            </UserCompContext.Provider>
          </PerformanceContext.Provider>
        </MockFetchContext.Provider>
      </DetailsContext.Provider>
    );
  
    const searchInput = screen.getByPlaceholderText('Search Components');
    fireEvent.change(searchInput, { target: { value: 'Component 1' } });
  
    const comp1 = screen.getByText(/Component 1/i);
    const comp2 = screen.queryByText(/Component 2/i);
    expect(comp1).toBeInTheDocument();
    expect(comp2).toBeNull();
  });
});

