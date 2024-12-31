import { geolocation } from "geolocation";

geolocation.watchPosition(locationSuccess, locationError, { timeout: 60 * 1000 });

function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}


import * as messaging from "messaging";


messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("App is ready to send or receive messages");
  sendMessage()
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

function sendMessage() {
  // Sample data
  const data = {
    title: 'My test data',
    isTest: true,
    records: [1, 2, 3, 4]
  }

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
}

