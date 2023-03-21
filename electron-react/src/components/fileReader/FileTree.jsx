import { ipcRenderer } from "electron";
import React, { useState, useContext } from "react";

const fs = window.require("fs");
const pathModule = window.require("path");

const { app } = window.require("@electron/remote");

const FileTree = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // const handleFileEvent = (e) => {
  //   uploadedFiles.push(e.target.files);
  //   console.log(e.target.files);
  // }

  const generateSubTrees = (fileObj, directoryPath) => {
    // base case: when file is not a directory, return the whole files array;
    for (let i = 0; i < fileObj.length; i++) {
      const file = fileObj[i];
      if (file.directory === true) {
        const subDirectoryPath = pathModule.join(directoryPath, file.name);
        file.files = 
        generateSubTrees(fileTreeObject(subDirectoryPath), subDirectoryPath);
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
    console.log(fullTree);
  };

  const fileTreeObject = (directoryPath) => {
    console.log("DIRECTORY PATH: ", directoryPath);
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

  return (
    <div>
      <button className="open-folder-button" onClick={handleOpenFolder}>
        Open Folder
      </button>
    </div>
  );
};

export default FileTree;
