Run webserver (node server.js in proper dir); currently running on localhost:3000 

Separately, use fitbit CLI (npx fitbit) to run the fitbit app/companion app on fitbit OS simulator (windows) 

In fitbit CLI, run bi (in test-app-one dir) to build & install the code onto the Fitbit OS device

In fitbit OS device, run app

## Overview 

(Done) Fitbit *device* (i.e. the code on the physical fitbit, the "device", "/app/index.js") will log GPS coords (currently: logs on change; TODO: log on time interval)

(TODO) Fitbit *Messaging API* will send GPS info FROM device TO companion (i.e. the phone with fitbit app installed)

(Done) Fitbit *companion* (i.e. phone) will receive data FROM device and send TO webserver (i.e. some server somewhere else in the world, via an internet connection/fetch interface)

(Done) *webserver* will receive data from companion 

(TODO) *webserver* will store data in *database* (i.e. some local MongoDB or something)

(TODO) *webserver* will perform analysis on data and flag anomalies 

(TODO) *webserver* will query user (via phone number/SMS? email? etc.) to ask for anomaly explanations