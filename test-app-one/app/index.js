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

import { outbox } from "file-transfer";

function transferData() {
  let queuedFile = 'FILE_NAME.bin';
  outbox.enqueueFile(queuedFile)
  .then((ft) => {
    console.log('Transfer of ' + ft.name + ' successfully queued.');
    ft.onchange = () => {
      console.log('File Transfer State: ' + ft.readyState);
      if (ft.readyState === 'transferred') {
        console.log('Transfer of ' + ft.name + ' completed.');
      }
    }
  })
}
