import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

function Searchuser() {
    const [queries, setQueries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);


    const handleSearch = async () => {
        try {
            const response = await axios.post('https://backend-pdf.onrender.com/search', { queries });
            console.log('Search results:', response.data.results);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };
    const getFileNameWithoutExtension = (fileName) => {
        return fileName.split('.').slice(0, -1).join('.');
    };
    const handleDownload = async (downloadLink) => {
        try {
            const response = await axios.get(`https://backend-pdf.onrender.com${downloadLink}`, {
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
        setQueries(e.target.value.split(',').map(query => query.trim())); // Split input by comma
    };
    return (
        <>
        <Header />
        <div class="container">
            
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <input
                        type="text"
                        class="form-control mb-3"
                        value={queries.join(', ')}
                        onChange={handleChange}
                        placeholder="Enter search queries separated by commas..."
                    />
                    <button class="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
                    <ul class="list-group">
                        {searchResults.map((result, index) => (
                            <li class="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                <span>{getFileNameWithoutExtension(result.file)}</span>
                                <button class="btn btn-secondary" onClick={() => handleDownload(result.downloadLink)}>Download</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>

    );
}

export default Searchuser;
