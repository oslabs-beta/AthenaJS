import { ipcRenderer } from "electron";
import React, { useState, useContext } from "react";
import DirectoryComponent from "./DirectoryComponent";

const fs = window.require("fs");
const pathModule = window.require("path");

const { app } = window.require("@electron/remote");
/**
 * interface file {name:string, directory: boolean, files: file[] }
 * @returns
 */
const FileExplorer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // toggle sidebar
  const [explorerVisible, setExplorerVisible] = useState(true);

  // sets CSS to transition sidebar to close
  const sidebarClass = explorerVisible ? "sidebar" : "sidebar closed";
  const handleToggle = (e) => {
    setExplorerVisible(!explorerVisible);
  };

  const generateSubTrees = (fileObj, directoryPath) => {
    // base case: when file is not a directory, return the whole files array;
    for (let i = 0; i < fileObj.length; i++) {
      const file = fileObj[i];
      if (file.directory === true) {
        const subDirectoryPath = pathModule.join(directoryPath, file.name);
        file.files = generateSubTrees(
          fileTreeObject(subDirectoryPath),
          subDirectoryPath
        );
      }
    }
    return fileObj;
  };

  const handleOpenFolder = () => {
    const directory = ipcRenderer.sendSync("OpenFolder");
    console.log("DIRECTORY HERE!!!: ", directory);
    let directoryPath = directory[0];
    directoryPath = directoryPath.replace(/\\/g, "/");
    const fileObj = fileTreeObject(directoryPath);
    const fullTree = generateSubTrees(fileObj, directoryPath);
    const htmlArray = generateFileHTML(fullTree);
    setUploadedFiles(htmlArray);
  };

  const fileTreeObject = (directoryPath) => {
    // console.log("DIRECTORY PATH: ", directoryPath);
    const filesObj = fs
      .readdirSync(directoryPath)

      .map((file) => {
        // console.log(file);
        const stats = fs.statSync(pathModule.join(directoryPath, file));
        // console.log(stats);
        return {
          name: file,
          directory: stats.isDirectory(),
          files: [],
        };
      })
      .sort((a, b) => {
        if (a.directory === b.directory) {
          return a.name.localeCompare(b.name);
        }
        return a.directory ? -1 : 1;
      });
    return filesObj;
  };

  const generateFileHTML = (fileTree) => {
    const htmlArray = [];
    for (const file of fileTree) {
      const { name } = file;
      const { files } = file;
      if (file.directory) {
        htmlArray.push(
          <DirectoryComponent name={name} files={files}></DirectoryComponent>
        );
      } else {
        htmlArray.push(
          <button onClick={() => handleFolderToggle()} className="file-button">
            {name}
          </button>
        );
      }
    }
    return htmlArray;
    // console.log(htmlArray);
  };
  // File.jsx potentially

  return (
    <div className={sidebarClass}>
      <div className="side-nav">
        <div className="side-nav-buttons-top">
          <button className="explorer-button" onClick={handleToggle}>
            O
          </button>
        </div>
      </div>
      {explorerVisible && (
        <div id="file-system-container">
          <div className="file-system-header">
            <h2>File Explorer</h2>
            <button
              className="open-folder-button"
              onClick={() => {
                handleOpenFolder();
              }}
            >
              Open Folder
            </button>
          </div>
          <div className="root-directory">
            <div className="root-dir-header">{uploadedFiles}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
