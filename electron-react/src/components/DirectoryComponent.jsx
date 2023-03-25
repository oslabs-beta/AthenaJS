import React, { useState } from "react";

const DirectoryComponent = ({ name, files, fileParser, path }) => {
  // each directory component has access to it's name and files on property object
  // hook to tell whether button is opened or not
  const [isOpen, setOpen] = useState(false);

  const handleFolderToggle = () => {
    setOpen(!isOpen);
  };
  // console.log(fileParser);

  // TODO: readability refactor for recursive call
  return (
    <div className="folder">
      <button className="folder-button" onClick={handleFolderToggle}>
        <svg className={isOpen ? 'folder-button-icon chevron-down' : 'folder-button-icon'} 
          alt="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <span className="file-button-text">{name}</span>
      </button>

      {/* when isOpen is true, render all of the subfiles of the directory component */}
      {isOpen && (
        <div className="sub-files">
          <div className = 'vl'/>
          {/* map over each subfile */}
          {files.map((file) => {
            {/* generate subPath */}
            const subPath = `${path}/${file.name}`; // create a variable to store the path
            {/* recursively render directory component with updated path, filename, and subfiles */}
            return (
              <div key={file.name}>
                {file.directory ? (
                  <DirectoryComponent
                    path={subPath}
                    fileParser={fileParser}
                    name={file.name}
                    files={file.files}
                  />
                ) : (
                  <button
                    className="file-button"
                    onClick={() => fileParser(subPath)}
                  >
                    <span className="file-button-text">{file.name}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DirectoryComponent;
