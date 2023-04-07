import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileExplorer from '../FileExplorer';
import { DetailsProvider } from '../../context/DetailsContext';
import '@testing-library/jest-dom';

describe('File Explorer Component', () => {
  it('should have button to open os folder system', () => {
    const { getByRole } = render(
      <DetailsProvider value={{ showUI: true }}>
        <FileExplorer />
      </DetailsProvider>
    );
    // expect(getByRole('span')).toBeInTheDocument();
  });


  it('should open os folder system on button click', () => {
    
  });

  it('should render Directory Components when folder from os system is submitted', () => {
  
  });
});
