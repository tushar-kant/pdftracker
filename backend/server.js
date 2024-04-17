const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');
const axios = require('axios');

const query = 'PROGRAMMING';


const app = express();
const port = 3000;

// Multer storage configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for handling file uploads and PDF processing
// Route for handling file uploads and PDF processing
app.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        // Extract text from PDF
        const buffer = req.file.buffer;
        const data = await pdf(buffer);
        const text = data.text;

        // Store the extracted text in local storage
        const textFilePath = `uploads/${req.file.originalname}.txt`;
        fs.writeFileSync(textFilePath, text);

        // Store the original PDF file
        const pdfFilePath = `uploads/${req.file.originalname}`;
        fs.writeFileSync(pdfFilePath, buffer);

        res.status(200).json({ 
            message: 'PDF and text extracted and stored locally.',
            pdfFilePath,
            textFilePath 
        });
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/download', (req, res) => {
    const { file } = req.query;
    const filePath = path.join(__dirname, 'uploads', file);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'File not found' });
        return;
    }

    // Set the appropriate content type for the response
    res.setHeader('Content-Type', 'application/octet-stream');
    // Set the Content-Disposition header to specify the file name
    res.setHeader('Content-Disposition', `attachment; filename="${file}"`);

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

app.get('/search', (req, res) => {
    const { query } = req.query;
    console.log('Search query:', query);

    // Array to store search results
    const results = [];

    // Read all files from the 'uploads' directory
    fs.readdir('uploads', (err, files) => {
        if (err) {
            console.error('Error reading files:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Loop through each file
        files.forEach(file => {
            // Read the content of each file
            const filePath = path.join('uploads', file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Check if the content contains the query keyword
            if (content.includes(query)) {
                // Store file name and add a download link
                const fileNameWithoutExtension = file.split('.').slice(0, -1).join('.');
                const downloadLink = `/download?file=${encodeURIComponent(fileNameWithoutExtension)}`;
                                results.push({ file, downloadLink });
            }
        });

        // Send the search results to the client
        res.json({ results });
    });
});



async function search(query) {
    try {
        const response = await axios.get(`http://localhost:3000/search?query=${query}`);
        console.log('Search results:', response.data.results);
    } catch (error) {
        console.error('Error searching:', error);
    }
}


search(query);



// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
