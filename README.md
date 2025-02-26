Run webserver (node server.js in proper dir); currently running on localhost:3000 

Separately, use fitbit CLI (npx fitbit) to run the fitbit app/companion app on fitbit OS simulator (windows) 

In fitbit CLI, run bi (in test-app-one dir) to build & install the code onto the Fitbit OS device

In fitbit OS device, run app


Note: stem-os.orc.gmu.edu:7798

TODO: could use this to enrich: https://dev.fitbit.com/build/reference/device-api/user-profile/
## Overview 

(Done) Fitbit *device* (i.e. the code on the physical fitbit, the "device", "/app/index.js") will log GPS coords (currently: logs on change; TODO: log on time interval)

(Done) Fitbit *Messaging API* will send GPS info FROM device TO companion (i.e. the phone with fitbit app installed)

(Done) Fitbit *companion* (i.e. phone) will receive data FROM device and send TO webserver (i.e. some server somewhere else in the world, via an internet connection/fetch interface)

(Done) *webserver* will receive data from companion 
*** TODO: only send every 5 seconds max


(Done) *webserver* will store data in *database* (i.e. some local MongoDB or something)
*** Store in a CSV for now
*** TODO: Get UID for each user

(TODO) *webserver* will perform analysis on data and flag anomalies 

(TODO) *webserver* will query user (via phone number/SMS? email? etc.) to ask for anomaly explanations
