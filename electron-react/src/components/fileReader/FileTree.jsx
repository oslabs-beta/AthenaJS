import { ipcRenderer } from "electron";
import React, { useState, useContext } from "react";

const fs = window.require("fs");
const pathModule = window.require("path");

const { app } = window.require("@electron/remote");

const FileTree = () => {
  const [path, setPath] = useState(app.getAppPath());
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // const handleFileEvent = (e) => {
  //   uploadedFiles.push(e.target.files);
  //   console.log(e.target.files);
  // }

  const handleOpenFolder = () => {
    const directory = ipcRenderer.sendSync("OpenFolder");
    console.log("DIRECTORY HERE!!!: ", directory);
    let directoryPath = directory[0];
    directoryPath = directoryPath.replace(/\\/g, "/");
    const fileObj = fileTreeObject(directoryPath);
    // console.log(fileObj);

    for (let i = 0; i < fileObj.length; i++){
      const file = fileObj[i];
      // console.log(file.name);
      // console.log(file.directory);
      if (file.directory === true){
        // console.log(`${directoryPath}` + '/' + `${file.name}`)
        // console.log([...fileTreeObject(`${directoryPath}` + '/' + `${file}`)])
        file.files = [...fileTreeObject(`${directoryPath}` + '/' + `${file.name}`)]
      }
    }
    console.log(fileObj);
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
          files: []
        };
      })
      .sort((a, b) => {
        if (a.directory === b.directory) {
          return a.name.localeCompare(b.name);
        }
        return a.directory ? -1 : 1;
      });
    return filesObj;
    // now we have an array of objects, true for folder, false for file
    // we want to iterate over all of the files in our files array, and if it is a directory, we recursively call our fileTreeObject function to generate a new "files array"
  };

  // const filePaths = ipcRenderer.sendSync('ReadDir', directoryPath);
  // console.log('filePaths!!!: ', filePaths);

  // const onBack = () => setPath(pathModule.dirname(path));
  // const onOpen = (folder) => setPath(pathModule.join(path, folder));

  return (
    <div>
      <button className="open-folder-button" onClick={handleOpenFolder}>
        Open Folder
      </button>
    </div>
  );
};

export default FileTree;
