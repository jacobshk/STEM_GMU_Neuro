let url = "http://localhost:3000/"

fetch(url).then( (res) => {
    console.log("here")
    console.log(res);
    return(res.text())
})
.then((data) =>{
    console.log("logging data")
    console.log(data)
})
.catch((err) => {
    console.log("Error: ", err)
})



// Create a sample data object
const fileData = {
    timestamp: new Date().toISOString(),
    deviceId: 'fitbit123',
    readings: [1, 2, 3, 4, 5]
};

// Convert to string/buffer
const fileContent = JSON.stringify(fileData);

// Send to server
async function uploadFile() {
    try {
        const fileData = {
            timestamp: new Date().toISOString(),
            deviceId: 'fitbit123',
            readings: [1, 2, 3, 4, 5]
        };

        console.log('Attempting to upload:', fileData);  // Debug log

        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileData)
        });
        
        console.log('Response status:', response.status);  // Debug log
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Upload successful:', result);
        
    } catch (error) {
        console.error('Upload failed - Full error:', error);  // Enhanced error logging
        console.error('Error message:', error.message);       // Specific error message
    }
}
// Execute the upload
uploadFile();




