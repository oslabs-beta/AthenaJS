// import Update from '@/components/update'
import Workshop from './pages/Workshop'
import { DetailsProvider } from './components/context/DetailsContext'
import './App.scss'
import FileExplorer from './components/FileExplorer'
import { ipcRenderer } from "electron";
import React, { useState, useContext } from "react";

const fs = window.require("fs");
const pathModule = window.require("path");

const { app } = window.require("@electron/remote");
// import FileTree from './components/fileReader/FileTree'


function App() {
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
    setUploadedFiles(fullTree);
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

  return (
    <div className='App'>
      <h1>Athena</h1>
      <DetailsProvider>
        <FileExplorer uploadedFiles = {uploadedFiles} handleOpenFolder = {handleOpenFolder} />
        <Workshop />
        {/* <FileTree /> */}
      </DetailsProvider>
      {/* <Update /> */}
    </div>
  )
}

export default App
