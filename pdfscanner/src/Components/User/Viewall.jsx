import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Headers from './Header';
import Loader2 from '../Loader/Loader2'; // Import the Loader component
import config from '../../config.jsx';


function ViewAll() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to indicate loading status

  

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/file/viewall`);
        // const response = await axios.get('https://backend-pdf.onrender.com/file/viewall');

        setPdfFiles(response.data.results);
      } catch (error) {
        console.error('Error fetching PDF files:', error);
      }
      finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    fetchPdfFiles();
  }, []);

  const getFileNameWithoutExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.');
  };

  const handleDownload = async (downloadLink) => {
    try {
      const response = await axios.get(`http://localhost:3030${downloadLink}`, {
        // const response = await axios.get(`https://backend-pdf.onrender.com${downloadLink}`, {

        responseType: 'blob', // Specify response type as blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'downloaded_file.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      <Headers />
      {isLoading && <Loader2 />} {/* Display loader if isLoading is true */}
      <div className="container mt-5">
        <div className="card shadow rounded border-primary">
          <div className="card-header bg-light text-dark  d-flex justify-content-between align-items-center">
            <h3 className="mb-0 text-primary">View All Files</h3>
          </div>
          <div className="card-body px-3 bg-light">
            {pdfFiles.length > 0 ? (
              <ul className="list-group mb-0">
                {pdfFiles.map((file, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <span className="text-dark">{getFileNameWithoutExtension(file.filename)}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => handleDownload(file.downloadLink)}>
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-primary">No PDF files found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAll;
