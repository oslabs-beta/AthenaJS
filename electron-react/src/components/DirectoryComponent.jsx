import React, { useState } from "react";

const DirectoryComponent = ({ name, files }) => {
  // each directory component has access to it's name and files on property object
  // hook to tell whether button is opened or not
  const [isOpen, setOpen] = useState(false);

  const handleFolderToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="folder-button">
      <button className="folder-button" onClick={handleFolderToggle}>
        {name}
      </button>
      {isOpen && (
        <div className="sub-files">
          {files.map((file) => (
            <div key={file.name}>
              {file.directory ? (
                <DirectoryComponent name={file.name} files={file.files} />
              ) : (
                <button className="file-button">{file.name}</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryComponent;
