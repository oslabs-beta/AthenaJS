import { ipcRenderer } from 'electron';
import React, { useState, useContext } from 'react';

const FileTree = () => {

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // const handleFileEvent = (e) => {
  //   uploadedFiles.push(e.target.files);
  //   console.log(e.target.files);
  // }

  const handleOpenFolder = () => {
    let directory = ipcRenderer.sendSync('OpenFolder');
    console.log('DIRECTORY HERE!!!: ', directory);
    let directoryPath = directory[0];
    directoryPath = directoryPath.replace(/\\/g, '/');
    fileTreeObject(directoryPath);
  };

  const fileTreeObject = (directoryPath) => {
    console.log('DIRECTORY PATH: ', directoryPath);
    const filePaths = ipcRenderer.sendSync('ReadDir', directoryPath);
    console.log('filePaths!!!: ', filePaths);
  };

  return (
    <div>
      <button className='open-folder-button' onClick={handleOpenFolder}>Open Folder</button>
    </div>
  );
};

export default FileTree;