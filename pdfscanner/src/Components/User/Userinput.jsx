import React, { useState } from 'react';
import axios from 'axios';
import Searchuser from './Searchuser';
import Header from './Header';

function Userinput() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('resume', file);
    });

    try {
      const response = await axios.post('https://backend-pdf.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  return (
    <>
    <Header />
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h2>Upload PDF</h2>
            <div class="custom-file mb-3">
            <input type="file" class="custom-file-input" id="customFile" accept=".pdf" onChange={handleFileChange} multiple />
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
            <div id="selectedFile" class="mb-3"></div>
            <button class="btn btn-primary" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>

      <hr />


    </>
  )
}

export default Userinput