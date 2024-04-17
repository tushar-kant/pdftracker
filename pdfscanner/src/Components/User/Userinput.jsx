import React, { useState } from 'react';
import axios from 'axios';
import Searchuser from './Searchuser';

function Userinput() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (!selectedFile) return;
    
        const formData = new FormData();
        formData.append('resume', selectedFile);
    
        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
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

            <div>
                <h2>Upload PDF</h2>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                <button onClick={handleUpload}>Upload</button>
            </div>
            <Searchuser />

        </>
    )
}

export default Userinput