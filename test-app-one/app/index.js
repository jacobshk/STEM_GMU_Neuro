import { geolocation } from "geolocation";
import * as messaging from "messaging";
import { me as device } from "device";


// Initialize the application
function initializeApp() {
  setupMessaging();
  watchLocation();
}

// Setup messaging handlers
function setupMessaging() {
  if (messaging.peerSocket) {
    messaging.peerSocket.addEventListener("open", () => {
      console.log("App is ready to send or receive messages");
    });

    messaging.peerSocket.addEventListener("error", (err) => {
      console.error(`Connection error: ${err.code} - ${err.message}`);
    });
  } else {
    console.warn("Messaging peerSocket is unavailable.");
  }
}

// Watch the user's location
function watchLocation() {
  geolocation.watchPosition(
    handleLocationSuccess,
    handleLocationError,
    { timeout: 60 * 1000 }
  );
}

// Handle successful location retrieval
function handleLocationSuccess(position) {
  const { latitude, longitude } = position.coords;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  sendMessage({ latitude, longitude });
}

// Handle location retrieval errors
function handleLocationError(error) {
  console.error(`Geolocation error: ${error.message}`);
  sendMessage(`geolocation error: ${error.message}` );

}

// Send a message to the peerSocket
function sendMessage(data) {
  if (messaging.peerSocket && messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    data.modelName = device.modelName;
    messaging.peerSocket.send(data);
    console.log("(App) Message sent:", data);
  } else {
    console.warn("Cannot send message: peerSocket is not open");
  }
}

// Start the app
initializeApp();
