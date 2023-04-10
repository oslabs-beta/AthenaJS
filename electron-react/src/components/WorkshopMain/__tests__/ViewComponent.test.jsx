import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { UserCompProvider } from '../../context/UserCompContext'
import { DetailsProvider } from '../../context/DetailsContext';
import { PerformanceProvider } from '../../context/PerformanceContext';
import { MockFetchProvider } from '../../context/MockFetchContext';
import ViewComponent from '../ViewComponent';

jest.mock('fetch-mock', () => jest.fn());

const mockProviderValues = {
  mockUserCompValue : {
    components: [
      { name: 'Component 1', body: 'Const var1 = 1', jsx: '<div>Component JSX 1</div>', mockServer: null },
      { name: 'Component 2', body: 'Const var2 = 2', jsx: '<div>Component JSX 2</div>', mockServer: null },
    ],
    dispatch: jest.fn(),
  },
  mockDetailsValue : {
    compBody: ['', jest.fn()],
    compJSX: ['', jest.fn()],
    tempCompBody: ['', jest.fn()],
    tempCompJSX: ['', jest.fn()],
  },
  mockMockFetchValue : {
    mockServer: [false, jest.fn()],
  },
  mockPerformanceValue : {
    keyCount: [0, jest.fn()],
  },
}

function renderViewComponent ({
  mockUserCompValue,
  mockDetailsValue,
  mockPerformanceValue,
  mockMockFetchValue
}) {
  return render(
    <UserCompProvider value = {mockUserCompValue}>
      <DetailsProvider value = {mockDetailsValue}>
        <PerformanceProvider value = {mockPerformanceValue}>
          <MockFetchProvider value = {mockMockFetchValue}>
            <ViewComponent />
          </MockFetchProvider>
        </PerformanceProvider>
      </DetailsProvider>
    </UserCompProvider>
  );
};

describe('ViewComponent component', () => {
  it('should render successfully', () => {
    renderViewComponent(mockProviderValues);
    const element = screen.getByText(/Render Time/i);
    expect(element).toBeInTheDocument();
  });

  it('should be able to input a render name', async () => {
    renderViewComponent(mockProviderValues);
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'foo');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('foo');
  });

  it('should have a button that on click should display a render time', async () => {
    renderViewComponent(mockProviderValues);
    await userEvent.click(screen.getByRole('button', {name: /Add Data/i}));
    expect(screen.getByText(/\d+ ms/i)).toBeInTheDocument();
  });

  // it('should render an element (from a context)', async () => {
  //   const tempProviderValues = {
  //     ...mockProviderValues, 
  //     mockDetailsValue: {
  //       ...mockProviderValues.mockDetailsValue,
  //       compJSX: ['<h1>hello</h1>' ,jest.fn()]
  //     }
  //   };
  //   console.log(tempProviderValues.mockDetailsValue.compJSX[0]);
  //   renderViewComponent(tempProviderValues);
  //   screen.debug();
  //   expect(screen.getByText(/hello/i)).toBeInTheDocument();
  // });
});