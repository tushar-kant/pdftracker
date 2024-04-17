import React, { useState } from 'react';
import axios from 'axios';

function Searchuser() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search?query=${query}`);
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
            const response = await axios.get(`http://localhost:3000${downloadLink}`, {
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
        <div>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>
                        <span>{getFileNameWithoutExtension(result.file)}</span>
                        <button onClick={() => handleDownload(result.downloadLink)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Searchuser;
