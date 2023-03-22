import React, { useState } from 'react';
/**
 * interface file {name:string, directory: boolean, files: file[] }
 * @returns 
 */
const FileExplorer = ({handleOpenFolder, uploadedFiles}) => {

  // toggle sidebar
  const [explorerVisible, setExplorerVisible] = useState(true);
  
  // sets CSS to transition sidebar to close
  const sidebarClass = explorerVisible ? 'sidebar' : 'sidebar closed';
  const handleToggle = (e) => {
    setExplorerVisible(!explorerVisible);
  };

  const handleUploadedFiles = () => {

  }

  // File.jsx potentially
  

  return (
    <div className={sidebarClass}>
      <div className='side-nav'>
        <div className="side-nav-buttons-top">
          <button className='explorer-button' onClick={handleToggle}>O</button>
          <button className="open-folder-button" onClick={() => {
            handleOpenFolder();
          }}>
        Open Folder
      </button>
      {uploadedFiles}
        </div>
      </div>
      {explorerVisible &&
        <div id='file-system-container'>
          <div className="file-system-header">
            <h2>File Explorer</h2>
          </div>
          <div className="root-directory">
            <div className="root-dir-header">
              <button className='directory-button'>temp root name</button>
              <div className='directory-panel'>
                <ul>
                  <li><a href="#">temp file dummy</a></li>
                  <li><a href="#">temp file dummy</a></li>
                  <li><a href="#">temp file dummy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default FileExplorer;