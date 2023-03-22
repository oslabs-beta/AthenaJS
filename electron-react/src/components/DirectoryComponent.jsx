import React, { useState } from "react";

const DirectoryComponent = ({ name, files, fileParser, path }) => {
  // each directory component has access to it's name and files on property object
  // hook to tell whether button is opened or not
  const [isOpen, setOpen] = useState(false);

  const handleFolderToggle = () => {
    setOpen(!isOpen);
  };
  // console.log(fileParser);

  return (
    // render initial directory component
    <div className="folder-button">
      <button className="folder-button" onClick={handleFolderToggle}>
        {name}
      </button>

      {/* when isOpen is true, render all of the subfiles of the directory component */}
      {isOpen && (
        <div className="sub-files">
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
                    {file.name}
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
