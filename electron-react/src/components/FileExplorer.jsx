import { ipcRenderer } from 'electron';
import React, { useState, useContext } from 'react';
import DirectoryComponent from './DirectoryComponent';
import { Resizable } from 're-resizable';
import { DetailsContext } from './context/DetailsContext';
import { motion } from 'framer-motion';
import { FaFolderOpen } from 'react-icons/fa';

const fs = window.require('fs');
const pathModule = window.require('path');

const babelParser = window.require('@babel/parser');
import traverse from '@babel/traverse';


const containerVariants = {
  hidden: {
    x: '-5rem',
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 100,
    },
  },
  exit: {
    x: '-77%',
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 100,
    },
  },
};

/**
 * interface file {name:string, directory: boolean, files: file[] }
 * @returns
*/
const FileExplorer = () => {
  // Contexts from details context
  const { tempCompBody, tempCompJSX } = useContext(DetailsContext);
  const [tempCompJSXVal, setTempCompJSXVal] = tempCompJSX;
  const [tempCompBodyVal, setTempCompBodyVal] = tempCompBody;
  
  // store htmlArray in state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // toggle sidebar
  const [explorerVisible, setExplorerVisible] = useState(false);

  // sets CSS to transition sidebar to close
  const sidebarClass = explorerVisible ? 'sidebar' : 'sidebar-closed';
  const handleToggle = (e) => {
    setExplorerVisible(!explorerVisible);
  };

  const handleOpenFolder = () => {
    // open folder
    const directory = ipcRenderer.sendSync('OpenFolder');
    // console.log("DIRECTORY HERE!!!: ", directory);
    let directoryPath = directory[0];
    // accounting for windows backslash to normalize the path
    directoryPath = directoryPath.replace(/\\/g, '/');
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
        return file !== 'node_modules' && file !== '.git';
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
        // this line uses the fileTreeObject funciton to generate alevel of file objects, and generateSubTrees allows us to move down the file 'tree' and create all file objects.
        file.files = generateSubTrees(fileTreeObject(file.path), file.path);
      }
    }
    return fileArr;
  };

  //This function allows us to parse files in order to populate our text areas within PropsWindow.jsx
  function parseAndTraverseAST (dataString) {
    
    //Initialize two empty arrays to store parsed function declarations and JSX returns
    const componentBodyArray = [];
    const JSXArray = [];

    //Initialize a bool flag to track whether or not there is JSX within a function 
    let isJSX = false;

    //This object defines a vistor for traversing nested JSX elements with a function declaration
    const nestedJSXVisitor = {
      JSXElement(path) {
        isJSX = true;
        console.log('this is a nestedJSXVisitor', path.node);

        // Extract the string representation of the JSX element
        const parsedStr = `${dataString.slice(path.node.start, path.node.end)}`;
        console.log('PARSED STRING: ', `${parsedStr}`);
      }
    };

    //Use Babel to parse the input codee string into an Abstract Syntax Tree (AST)
    const ast = babelParser.parse(dataString, { sourceType: 'module', plugins: ['jsx', 'flow'],});

    //Traverse the AST using the visitor pattern to extract function declarations and JSX Elements nested within return statements
    traverse(ast, {
      enter(path) {
        console.log('PATH!!!: ', path.node);
        if(path.isCallExpression()) {
          if(path.node.callee.name === 'useEffect') {
            const parsedStr = `${dataString.slice(path.node.start, path.node.end)}`;
            componentBodyArray.push(parsedStr);
          }
        }
        if (path.isFunctionDeclaration()) {
          //Traverse any nested JSX elements within the function declaration using the nestedJSXVisitor
          path.traverse(nestedJSXVisitor);
          //If the function declaration does not contain JSX, extract its string representation 
          if(isJSX === false) {
            const parsedStr = `${dataString.slice(path.node.start, path.node.end)}`;
            componentBodyArray.push(parsedStr);
          }
          //Reset the isJSX bool flag for the next function declaration 
          isJSX = false;
        }
        if (path.isVariableDeclaration()) {
          if(path.node.declarations[0].init.type === 'ArrowFunctionExpression') {

            //Traverse any nested JSX elements within the arrow function expression using the nestedJSXVisitor again
            path.traverse(nestedJSXVisitor);
            
            //If the arrow function does not contain JSX, extract its string representation
            if(isJSX === false) {
              const parsedStr = `${dataString.slice(path.node.start, path.node.end)}`;
              componentBodyArray.push(parsedStr);
            }

            // Reset the isJSX flag for the next arrow function expression
            isJSX = false;
          } else {
            // Parses normal variable declarations
            const parsedStr = `${dataString.slice(path.node.start, path.node.end)}`;
            componentBodyArray.push(parsedStr);
          }
        }
        //This conditional checks for JSX content as well as checks if the JSX's parent is a return statement. 
        if (path.isJSXElement() && path.parentPath.isReturnStatement()) {
          const parsedStr = `${dataString.slice(path.node.start, path.node.end)}`;
          JSXArray.push(parsedStr);
        }
      }
    });

    //Concatenate the parsed function declarations into a single string and save it to a state variable 
    let componentBodyString = '';
    if (componentBodyArray.length > 0) componentBodyString = componentBodyArray.reduce((acc, curr) => acc + '\n' + '\n' + curr);
    console.log('this is my componentBodyString: ', componentBodyString);
    setTempCompBodyVal(componentBodyString);
    
    //Concatenate the parsed JSX elements into a single string and save it to a state variable 
    const JSXString = JSXArray.reduce((acc, curr) => acc + '\n' + '\n' + curr);
    setTempCompJSXVal(JSXString);
  }

  
  const fileParser = (path) => {
    // asynchronously read file here passing in the absolute path. 
    // data is a string
    fs.readFile(path,'utf-8', (err, data) => {
      //declare variable extension which gets the extension of our file i.e. .jsx
      const extension = pathModule.extname(path).toLowerCase();
      try {
        switch(extension) {
        case '.jsx':
          parseAndTraverseAST(data);
          break;
          
        case '.js':
          console.log('JS File content:', data);
          break;
        case '.css':
          console.log('CSS File content:', data);
          break;
        default: 
          console.log('File data:', data);
        }
      }
      //handle errors
      catch(err) {
        console.log('ERROR: error reading file in DirectoryComponent.jsx:', err);
        return;
      }
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
            path = {path}
            fileParser = {fileParser}
            name={name} 
            files={files}></DirectoryComponent>
        );
      } else {
        // else create a button to render that will render on click.
        htmlArray.push(
          <button 
            className="file-button"
            onClick = {() => {fileParser(path)}}
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
        <motion.div
          key = 'expanded'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
            <motion.div 
              className='sidebar'
            >
              <div className="side-nav">
                <div className="side-nav-buttons-top">
                  <span className="material-icons" onClick={handleToggle}>
                      arrow_back_ios
                  </span>
                </div>
              </div>
              <div 
                id="file-system-container">
                <div className="file-system-header">
                  <h2>File Explorer</h2>
                  <span
                    id = "open-folder-button"
                    onClick={() => {
                      handleOpenFolder();
                    }}
                  >
                    <FaFolderOpen/>
                  </span>
                </div>
                <div className="root-directory">
                  <hr/>
                  <br/>
                  {/* this is where we render htmlArray */}
                  <div className="root-dir-header">{uploadedFiles}</div>
                </div>
              </div>
            </motion.div>
          </Resizable>
        </motion.div>
      ) : (
        <motion.div       
          style={{ opacity: .9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key = 'closed' 
          className='sidebar-closed'>
          <div className="side-nav">
            <div className="side-nav-buttons-top">
              <span className="material-icons" onClick={handleToggle}>
              arrow_forward_ios
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FileExplorer;
