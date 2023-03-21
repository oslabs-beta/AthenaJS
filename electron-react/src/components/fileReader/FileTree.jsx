import React, { useState, useContext } from 'react';

const FileTree = () => {

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileEvent = (e) => {
    uploadedFiles.push(e.target.files);
    console.log(e.target.files);
  }

  return (
    <div>
      <input type="file" className="upload-folder" onChange={handleFileEvent}/>
    </div>
  )
}

export default FileTree;