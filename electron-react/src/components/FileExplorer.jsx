import { ipcRenderer } from "electron";
import React, { useState, useContext } from "react";
import DirectoryComponent from "./DirectoryComponent";
import { Resizable } from "re-resizable";

const fs = window.require("fs");
const pathModule = window.require("path");
/**
 * interface file {name:string, directory: boolean, files: file[] }
 * @returns
 */
const FileExplorer = () => {
  // store htmlArray in state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // toggle sidebar
  const [explorerVisible, setExplorerVisible] = useState(true);

  // sets CSS to transition sidebar to close
  const sidebarClass = explorerVisible ? "sidebar" : "sidebar closed";
  const handleToggle = (e) => {
    setExplorerVisible(!explorerVisible);
  };

  // this function generates all of the subtrees after the first level is generated from fileTreeObject func
  const generateSubTrees = (fileObj, directoryPath) => {
    // iterate over fileObj param
    for (let i = 0; i < fileObj.length; i++) {
      const file = fileObj[i];
      // if it is a directory
      if (file.directory === true) {
        //create a subdirectory path of the given directory
        const subDirectoryPath = pathModule.join(directoryPath, file.name);
        // assign the files property to the eval result of
        // calling generateSubTrees, passing in eval result of
        // fileTreeObject(subDirectoryPath), and subDirectoryPath
        file.files = generateSubTrees(
          fileTreeObject(subDirectoryPath),
          subDirectoryPath
        );
      }
    }
    return fileObj;
  };

  const handleOpenFolder = () => {
    // open folder
    const directory = ipcRenderer.sendSync("OpenFolder");
    console.log("DIRECTORY HERE!!!: ", directory);
    let directoryPath = directory[0];
    directoryPath = directoryPath.replace(/\\/g, "/");
    // generate first level of file tree
    const fileObj = fileTreeObject(directoryPath);
    // generate full tree
    const fullTree = generateSubTrees(fileObj, directoryPath);
    // generate array of html elements for render.
    const htmlArray = generateFileHTML(fullTree);
    setUploadedFiles(htmlArray);
  };

  const fileTreeObject = (directoryPath) => {
    // console.log("DIRECTORY PATH: ", directoryPath);
    const filesObj = fs.readdirSync(directoryPath);
    // filter filesObj for node modules or git files
    const filteredFileObj = filesObj
      .filter((file) => {
        return file !== "node_modules" && file !== ".git";
      })
      // map over each file name, instead returning object that has name, directory, and files properties
      .map((file) => {
        // fs.statSync is how we get the data on whether a folder is a directory or not.
        const stats = fs.statSync(pathModule.join(directoryPath, file));
        // console.log(stats);
        return {
          name: file,
          directory: stats.isDirectory(),
          files: [],
        };
      })
      // sort folders first and files second
      .sort((a, b) => {
        if (a.directory === b.directory) {
          return a.name.localeCompare(b.name);
        }
        return a.directory ? -1 : 1;
      });
    return filteredFileObj;
  };

  const generateFileHTML = (fileTree) => {
    // taking in a full file tree
    const htmlArray = [];
    for (const file of fileTree) {
      const { name } = file;
      const { files } = file;
      if (file.directory) {
        // if file is a directory
          // create a directory component passing down name and files and push to htmlarray 
        htmlArray.push(
          <DirectoryComponent name={name} files={files}></DirectoryComponent>
        );
      } else {
        // else create a button to render that will render on click.
        htmlArray.push(
          <button className="file-button">
            {name}
          </button>
        );
      }
    }
    return htmlArray;
  };
  // File.jsx potentially

  return (
    <>
      {explorerVisible ? (
        <Resizable
          className={sidebarClass}
          defaultSize={{
            width: 'auto',
            height: 'auto',
          }}
          minWidth={250} 
          maxWidth={800} 
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <div className={sidebarClass}>
            <div className="side-nav">
              <div className="side-nav-buttons-top">
                <button className="explorer-button" onClick={handleToggle}>
                  O
                </button>
              </div>
            </div>
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
                {/* this is where we render htmlArray */}
                <div className="root-dir-header">{uploadedFiles}</div>
              </div>
            </div>
          </div>
        </Resizable>
      ) : (
        <div className={sidebarClass}>
          <div className="side-nav">
            <div className="side-nav-buttons-top">
              <button className="explorer-button" onClick={handleToggle}>
                O
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileExplorer;
