//Receive on companion device FROM fitbit

import * as messaging from "messaging";
import { settingsStorage } from "settings";



settingsStorage.onchange = evt => {
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    console.log("here");
    console.log(data);
    const email = settingsStorage.getItem("userEmail");
    console.log(email)
  }
};

initializeCompanion()

function initializeCompanion(){
    setupMessaging()
    forwardMessages()
}

//initialize socket connection between companion/fitbit
// Setup messaging handlers
function setupMessaging() {
  if (messaging.peerSocket) {
    messaging.peerSocket.addEventListener("open", () => {
      console.log("Companion is ready to send or receive messages");
    });

    messaging.peerSocket.addEventListener("error", (err) => {
      console.error(`Connection error: ${err.code} - ${err.message}`);
    });
  } else {
    console.warn("Messaging peerSocket is unavailable.");
  }
}
  
function forwardMessages(){

    //listen for messages from fitbit 
    messaging.peerSocket.addEventListener("message", (evt) => {
        console.log("Received message!")
        console.log(JSON.stringify(evt.data));

        //forward messages to server 

        // Create a sample data object
        //TODO: get unique identifer; some device ID? 
        const fileData = {
            timestamp: new Date().toISOString(),
            deviceId: 'fitbit123',
            latitude: evt.data.latitude,
            longitude: evt.data.longitude
        };

        // Send to server
        
        uploadFile(fileData);
    });

}



async function uploadFile(fileData) {
    try {

        console.log('Attempting to upload to server:', fileData);  // Debug log

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
        console.error('server Upload failed - Full error:', error);  // Enhanced error logging
        console.error('server Error message:', error.message);       // Specific error message
    }
}





