import React, { useState } from 'react';
import axios from 'axios';

function MultiInput() {
    const [department, setDepartment] = useState('');
    const [pdfs, setPdfs] = useState([]);

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPdfs(files);
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('department', department);
        pdfs.forEach((pdf) => {
            formData.append('pdfs', pdf);
        });

        try {
            await axios.post('https://backend-pdf.onrender.com/upload/pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('PDFs uploaded successfully.');
            // Optionally, you can reset the form state after successful upload
            setDepartment('');
            setPdfs([]);
        } catch (error) {
            console.error('Error uploading PDFs:', error);
        }
    };
  return (
    <>
     <div>
            <input
                type="text"
                value={department}
                onChange={handleDepartmentChange}
                placeholder="Enter department name"
            />
            <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload PDFs</button>
        </div>
    </>
  )
}

export default MultiInput