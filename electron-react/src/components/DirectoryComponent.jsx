import React, { useState } from "react";

const DirectoryComponent = ({ name, files }) => {
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
                <div className="file-button">{file.name}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryComponent;
