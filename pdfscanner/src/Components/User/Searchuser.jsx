import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Loader from '../Loader/Loader';

function Searchuser() {
  const [queries, setQueries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [searchOption, setSearchOption] = useState('allKeywords'); // State to store search option




  const handleSearch = async () => {
    try {
      setIsLoading(true); // Set loading to true before making the request

      const response = await axios.post('https://backend-pdf.onrender.com/search', { queries ,searchOption});
      // const response = await axios.post('http://localhost:3030/search', { queries ,searchOption});
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
      const response = await axios.get(`https://backend-pdf.onrender.com${downloadLink}`, {
        // const response = await axios.get(`http://localhost:3030${downloadLink}`, {
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
      {isLoading ? <Loader /> : (
      
        <div className="container mt-5">
          <div className="search-wrapper bg-light border rounded shadow-sm p-4">
            <h4 className="mb-3 text-center">Search by skill</h4>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter search queries separated by spaces..."
                value={queries.join(' ')} // Join with comma and space
                onChange={handleChange}
              />

            </div>
            <div className="input-group mb-3">
              <select className="custom-select bg-light border rounded" value={searchOption} onChange={handleSearchOptionChange}>
                <option value="allKeywords">Search All Keywords</option>
                <option value="anyKeyword">Search Any Keyword</option>
              </select>
            </div>
            <div className="input-group-append">
            <button className="btn btn-primary btn-lg d-block mx-auto mb-3" type="button" onClick={handleSearch}>
                <span className="d-none d-md-inline">Search</span> {/* Hide text on small screens */}
                <span className="d-inline d-md-none">Search</span> {/* Show text on small screens */}
              </button>
            </div>
            <p className="text-muted mb-3 text-center">
              Enter keywords (skills or topics) relevant to the PDFs you're searching for. Separate keywords with spaces.
            </p>
            {isLoading ? <Loader /> : (
              <div>
                {searchResults.length > 0 ? (
                  <ul className="list-group search-results">
                    {searchResults.map((result, index) => (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        <span>{getFileNameWithoutExtension(result.fileName)}</span>
                        <button className="btn btn-primary" onClick={() => handleDownload(result.downloadLink)}>
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center">No PDF files found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </>

  );
}

export default Searchuser;
