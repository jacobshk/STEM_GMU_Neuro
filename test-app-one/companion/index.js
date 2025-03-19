//Receive on companion device FROM fitbit

import * as messaging from "messaging";
import { settingsStorage } from "settings";


function safeParseJSON(jsonString) {
  try {
      return JSON.parse(jsonString);
  } catch (error) {
      console.error('Invalid JSON:', error.message);
      return null; // or handle the error appropriately
  }
}

/*
settingsStorage.onchange = evt => {
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    console.log("here")
    //the "user_id" field here is the same as the encodedId
    //use user_id field in messages to server, to uniquely identify this user
    let data = safeParseJSON(evt.newValue);
    let user_id = (data['user_id']);
    
  }
};
*/

function waitForSettingsChange() {
  return new Promise(resolve => {
      settingsStorage.onchange = evt => {
          console.log("using new user id");
          let data = safeParseJSON(evt.newValue);
          var user_id = data['user_id'];
          console.log(user_id)
          //for some reason, this function is called thrice for one click; the first and last are null; the middle is the good stuff
          if( typeof(user_id) == 'string' ){
            resolve(user_id); // Return user_id
          }
      };
  });
}

let user_id 
initializeCompanion()

async function initializeCompanion(){
  user_id = await waitForSettingsChange(); // Assign resolved value
  console.log("Settings loaded... user_id: ", user_id)
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

        console.log("Sending: ", user_id)
        const fileData = {
            timestamp: new Date().toISOString(),
            user_id: user_id,
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

        const response = await fetch('https://stem-os.orc.gmu.edu:5000', {
            method: 'PUT',
            headers: {
                'user_id': user_id,
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