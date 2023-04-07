import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DirectoryComponent from '../DirectoryComponent';
import { ShowUIContext } from '../../context/ShowUIContext';
import '@testing-library/jest-dom';

describe('Directory Component', () => {
  const files = [
    {
      name: 'file1',
      directory: false
    },
    {
      name: 'folder1',
      directory: true,
      files: [
        {
          name: 'file2',
          directory: false
        }
      ]
    }
  ];

  const fileParser = jest.fn();

  it('should receive all of its props', () => {
    const { getByRole } = render(
      <DirectoryComponent
        name="test directory"
        files={files}
        fileParser={fileParser}
        path="/"
      />
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should render a button with the directory name', () => {
    const { getByText } = render(
      <DirectoryComponent
        name="test directory"
        files={files}
        fileParser={fileParser}
        path="/"
      />
    );
    expect(getByText('test directory')).toBeInTheDocument();
  });

  it('should render all sub-directories when the button is clicked', () => {
    const { getByRole, getByText } = render(
      <ShowUIContext.Provider value={{ showUI: true }}>
        <DirectoryComponent
          name="test directory"
          files={files}
          fileParser={fileParser}
          path="/"
        />
      </ShowUIContext.Provider>
    );

    fireEvent.click(getByRole('button', { name: 'test directory' }));

    expect(getByText('file1')).toBeInTheDocument();
    expect(getByText('folder1')).toBeInTheDocument();
    // expect(getByText('file2')).toBeInTheDocument();
  });

  it('should call fileParser when a file is clicked', () => {
    const { getByText } = render(
      <DirectoryComponent
        name="test directory"
        files={files}
        fileParser={fileParser}
        path="/"
      />
    );

    fireEvent.click(getByText('file1'));

    expect(fileParser).toHaveBeenCalledWith('/file1');
  });
});
