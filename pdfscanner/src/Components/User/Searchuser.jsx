import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Loader from '../Loader/Loader';

import './searchuser.css';
import config from '../../config.jsx';

function Searchuser() {
  const [queries, setQueries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [searchOption, setSearchOption] = useState('allKeywords'); // State to store search option




  const handleSearch = async () => {
    try {
      setIsLoading(true); // Set loading to true before making the request

      // const response = await axios.post('https://backend-pdf.onrender.com/search', { queries ,searchOption});
      const response = await axios.post(`${config.baseURL}/search`, { queries, searchOption });
      setIsLoading(false);
      console.log('Search results:', response.data.results);
      setSearchResults(response.data.results);

      // window.alert('see results!');

    } catch (error) {
      console.error('Error searching:', error);
      window.alert('Search failed! Please try again.');
      setIsLoading(false); // Set loading to false in case of error


    }
  };
  const getFileNameWithoutExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.');
  };
  const handleDownload = async (downloadLink) => {
    try {
      // const response = await axios.get(`https://backend-pdf.onrender.com${downloadLink}`, {
      const response = await axios.get(`${config.baseURL}${downloadLink}`, {
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
  const handleDownloadExcel = async () => {
    try {
      const response = await axios.post(`${config.baseURL}/download-excel`, { queries, searchOption }, {
        responseType: 'blob', // Specify response type as blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'search_results.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };
  const handleChange = (e) => {
    // setQueries(e.target.value.split(' ').filter(query => query.trim())); // Split input by space
    const input = e.target.value;
    const newQueries = input.split(' ').map(query => query.trim());
    console.log('New queries:', newQueries);
    setQueries(newQueries);
  };
  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="container mt-5">
          <div className="search-wrapper bg-light border rounded shadow-sm p-4">
            <h4 className="mb-3 text-center">Search by Skill</h4>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter search queries separated by spaces..."
                value={queries.join(' ')}
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <select className="custom-select bg-light border rounded" value={searchOption} onChange={handleSearchOptionChange}>
                <option value="allKeywords">Search All Keywords</option>
                <option value="anyKeyword">Search Any Keyword</option>
              </select>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button className="btn btn-custom me-2" type="button" onClick={handleSearch}>
                <i className="bi bi-search me-2"></i> Search
              </button>
              <button className="btn btn-excel" type="button" onClick={handleDownloadExcel}>
                <i className="bi bi-file-earmark-excel-fill me-2"></i> Download Excel
              </button>
            </div>
            <p className="text-muted mb-3 text-center">
              Enter keywords (skills or topics) relevant to the PDFs you're searching for. Separate keywords with spaces.
            </p>
            {searchResults.length > 0 ? (
              <ul className="list-group search-results">
                {searchResults.map((result, index) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                    <span>{getFileNameWithoutExtension(result.fileName)}</span>
                    <button className="btn btn-primary" onClick={() => handleDownload(result.downloadLink)}>
                      <i className="bi bi-download"></i> Download
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No PDF files found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Searchuser;