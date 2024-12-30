const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('me  server!')
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.put('/', (req, res) => {
    res.send('Got a PUT request ')
})
  
app.delete('/', (req, res) => {
    res.send('Got a DELETE request ')
})
  
const cors = require('cors');  // Add CORS support
// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Add a basic GET endpoint for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/upload', (req, res) => {
    console.log('Received request headers:', req.headers);  // Debug log
    console.log('Received request body:', req.body);       // Debug log
    
    try {
        // Get the uploaded data
        const fileData = req.body;
        
        // Log the received data
        console.log('Processing file:', fileData);
        
        // Save timestamp of when server received it
        fileData.receivedAt = new Date().toISOString();
        
        // Send success response
        res.json({
            success: true,
            message: 'File received successfully',
            receivedData: fileData
        });
        
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing upload',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});