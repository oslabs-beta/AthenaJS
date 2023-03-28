import { ipcRenderer } from "electron";
import React, { useState, useContext } from "react";
import DirectoryComponent from "./DirectoryComponent";
import { Resizable } from "re-resizable";
import { DetailsContext } from "./context/DetailsContext";
// import * as acorn from "acorn";
import * as walk from "acorn-walk";
import { parse } from "acorn-loose";

const fs = window.require("fs");
const pathModule = window.require("path");

/**
 * interface file {name:string, directory: boolean, files: file[] }
 * @returns
 */
const FileExplorer = () => {
  // Contexts from details context
  const { tempCompProps, tempCompActions, tempCompHTML, tempCompState } =
    useContext(DetailsContext);
  const [tempCompPropsVal, setTempCompPropsVal] = tempCompProps;
  const [tempCompActionsVal, setTempCompActionsVal] = tempCompActions;
  const [tempCompHTMLVal, setTempCompHTMLVal] = tempCompHTML;
  const [tempCompStateVal, setTempCompStateVal] = tempCompState;

  // store htmlArray in state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // toggle sidebar
  const [explorerVisible, setExplorerVisible] = useState(true);
  //

  // sets CSS to transition sidebar to close
  const sidebarClass = explorerVisible ? "sidebar" : "sidebar-closed";
  const handleToggle = (e) => {
    setExplorerVisible(!explorerVisible);
  };

  const handleOpenFolder = () => {
    // open folder
    const directory = ipcRenderer.sendSync("OpenFolder");
    // console.log("DIRECTORY HERE!!!: ", directory);
    let directoryPath = directory[0];
    // accounting for windows backslash to normalize the path
    directoryPath = directoryPath.replace(/\\/g, "/");
    // generate first level of file tree
    const fileArr = fileTreeObject(directoryPath);
    // generate full tree
    const fullTreeArr = generateSubTrees(fileArr);
    // generate array of html elements for render.
    const htmlArray = generateFileHTML(fullTreeArr);
    setUploadedFiles(htmlArray);
  };

  const fileTreeObject = (directoryPath) => {
    // console.log("DIRECTORY PATH: ", directoryPath);
    const filesArray = fs.readdirSync(directoryPath);
    // filter filesObj for node modules or git files
    const filteredFileArr = filesArray
      .filter((file) => {
        return file !== "node_modules" && file !== ".git";
      })
      // map over each file name, instead returning object that has name, directory, and files properties
      // ['src', 'index']
      .map((file) => {
        // fs.statSync is how we get the data on whether a folder is a directory or not.
        const subPath = pathModule.join(directoryPath, file);
        const stats = fs.statSync(subPath);

        // console.log(stats);
        return {
          name: file,
          path: subPath,
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
    return filteredFileArr;
  };

  // this function generates all of the subtrees after the first level is generated from fileTreeObject func
  const generateSubTrees = (fileArr) => {
    // iterate over fileObj param
    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      // if it is a directory
      if (file.directory === true) {
        //create a subdirectory path of the given directory
        // const subDirectoryPath = pathModule.join(directoryPath, file.name);
        // assign the files property to the eval result of
        // calling generateSubTrees, passing in eval result of
        // fileTreeObject(subDirectoryPath), and subDirectoryPath
        file.files = generateSubTrees(fileTreeObject(file.path), file.path);
      }
    }
    return fileArr;
  };

  const fileParser = (path) => {
    // console.log(path);
    //We only really need plaintext here since AthenaJS handles the logic for us, do we even need to parse?

    // asynchronously read file here passing in the absolute path.
    // data is a string
    fs.readFile(path, "utf-8", (err, data) => {
      //declare variable extension which gets the extension of our file i.e. .jsx
      const extension = pathModule.extname(path).toLowerCase();
      const ast = parse(data, {ecmaVersion: "latest"});

      try {
        const ast = parse(data, {
          locations: true,
          ecmaVersion: "latest",
          sourceType: "module",
        });
      } catch (err) {
        console.log(
          "ERROR: error parsing file in DirectoryComponent.jsx:",
          err
        );
        return;
      }

      // //switch statement for different file types? Do we just Need JSX?
      // //I am going to keep the switch statement here for now, and remove it if we decide to only use JSX
      // try {
      //   switch(extension) {
      //   case '.jsx':
      //     // just the jsx return should be passed
      //     // regex matches return(<statement>) and also <statement>
      //     const returnRegex = /return\s*\((\s*<[\s\S]*?)\)/;
      //     // data.match => [return(<statement>), <statement>]
      //     const returnStatement = data.match(returnRegex)[1];
      //     console.log('JSX File content:', returnStatement);
      //     setTempCompHTMLVal(returnStatement);
      //     break;
      //   case '.json':
      //     console.log('JSON File content:', data);
      //     //how do we pass along this data into the JSX textarea?
      //     break;
      //   case '.js':
      //     console.log('JS File content:', data);
      //     //how do we pass along this data into the JSX textarea?
      //     break;
      //   default:
      //     console.log('File data:', data);
      //   }
      // }
      // //handle errors
      // catch(err) {
      //   console.log('ERROR: error reading file in DirectoryComponent.jsx:', err);
      //   return;
      // }
    });
  };

  const generateFileHTML = (fullTreeArr) => {
    // taking in a full file tree
    const htmlArray = [];
    for (const file of fullTreeArr) {
      const { name, files, path } = file;
      if (file.directory) {
        // if file is a directory
        // create a directory component passing down name and files and push to htmlarray
        htmlArray.push(
          <DirectoryComponent
            path={path}
            fileParser={fileParser}
            name={name}
            files={files}
          ></DirectoryComponent>
        );
      } else {
        // else create a button to render that will render on click.
        htmlArray.push(
          <button
            className="file-button"
            onClick={() => {
              fileParser(path);
            }}
          >
            <span className="file-button-text">{name}</span>
          </button>
        );
      }
    }
    return htmlArray;
  };

  return (
    <>
      {explorerVisible ? (
        <Resizable
          className={sidebarClass}
          defaultSize={{
            width: "auto",
            height: "auto",
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
                <span className="material-icons" onClick={handleToggle}>
                  arrow_back_ios
                </span>
              </div>
            </div>
            <div id="file-system-container">
              <div className="file-system-header">
                <h2>File Explorer</h2>
                <span
                  className="material-icons"
                  id="open-folder-button"
                  onClick={() => {
                    handleOpenFolder();
                  }}
                >
                  folder_open
                </span>
              </div>
              <div className="root-directory">
                <hr />
                <br />
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
              <span className="material-icons" onClick={handleToggle}>
                arrow_forward_ios
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileExplorer;
