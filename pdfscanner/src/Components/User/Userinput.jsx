import React, { useState } from 'react';
import axios from 'axios';
import Searchuser from './Searchuser';
import Header from './Header';
import ViewAll from './Viewall';
import Loader2 from '../Loader/Loader2'; // Assuming you have a Loader component
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { usePdf } from '@react-pdf-viewer/core';

import config from '../../config.jsx';

function Userinput() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [pdfUrl, setPdfUrl] = useState(null); // State to hold the PDF URL
  const [pdfUrls, setPdfUrls] = useState([]);
  const [dob, setDob] = useState('');
  const [experience, setExperience] = useState('');
  const [ctc, setCtc] = useState(''); // Step 1: State variable for CTC


  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);

    const fileUrls = [];
    let index = 0;

    const readNextFile = () => {
      if (index < event.target.files.length) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          fileUrls.push(fileReader.result);
          index++;
          readNextFile();
        };
        fileReader.readAsDataURL(event.target.files[index]);
      } else {
        setPdfUrls(fileUrls);
      }
    };

    readNextFile();
  };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('resume', file);
    });
    formData.append('dob', dob);
    formData.append('experience', experience);
    formData.append('ctc', ctc); // Step 3: Append CTC to form data


    try {
      setIsLoading(true); // Set loading to true before making the request

      // const response = await axios.post('https://backend-pdf.onrender.com/upload', formData, {
        const response = await axios.post(`${config.baseURL}/upload`, formData, {

        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);

      window.alert('Upload successful!');

    } catch (error) {
      console.error('Upload failed:', error);
      window.alert('Upload failed! Please try again.');

    } finally {
      setIsLoading(false); // Set loading to false after the request is completed (success or failure)
    }

  };
  return (
    <>
      <Header />
      {isLoading && <Loader2 />}
      <div className="container mt-5 d-flex justify-content-center"> {/* Centered layout */}
        <div className="card border-0 shadow rounded-lg overflow-hidden"> {/* Enhanced design */}
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Upload PDF</h3>
            {/* You can add a company logo here if desired */}
          </div>
          <div className="card-body px-5 py-4 bg-light"> {/* Improved padding */}
            <div className="input-group mb-3">

              <div className="input_container " >
                <input
                  type="file"
                  className="custom-file-input file-input"
                  id="fileUpload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  multiple
                />

              </div>
            </div>
            <label className="custom-file-label">Choose file(s)</label> <br />

            <small className="form-text text-muted">You can upload multiple PDF files.</small><br />
            <small className="form-text text-muted">Supported file format: PDF</small>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience:</label>
              <input type="text" className="form-control" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
            </div>
            <div className="form-group"> {/* Step 2: Add input field for CTC */}
              <label htmlFor="ctc">CTC:</label>
              <input type="number" className="form-control" id="ctc" value={ctc} onChange={(e) => setCtc(e.target.value)} />
            </div>
            <div id="selectedFile" className="mb-3"></div>
            <div className="text-center">
              <button className="btn btn-primary custom-button" onClick={handleUpload}>
                Upload
              </button>
            </div>
            <div style={{ width: '100%', height: 'auto', marginBottom: '0px' }}>
              {pdfUrls.map((pdfUrl, index) => (
                <div key={index} style={{  }}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfUrl} />
                  </Worker>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>



    </>
  )
}

export default Userinput