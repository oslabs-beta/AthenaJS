import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../../hooks/useContextHooks', () => ({
    useUserComp: jest.fn()
  }));

import NavContainerUI from '../NavContainerUI';

describe('NavContainerUI', () => {
  test('renders navigation container', () => {
    const { getByTestId } = render(<NavContainerUI bg="white" addNode={() => {}} removeNode={() => {}} />);
    expect(getByTestId('navigation-container')).toBeInTheDocument();
  });
});