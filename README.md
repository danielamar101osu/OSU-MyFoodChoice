
Ohio State University CSE 5915 Capstone Fall 2021

# OSU MyFoodChoice

OSU MyFoodChoice App is intended to be an application that students can use to find food near their current location that meets their dietary restrictions and easily track their own nutrition.

The product is an Android/iOS mobile application that stores data in the cloud for accessibility from any device at any time.

This repository only stores the front-end aspect of this application. Our design philosophy was the create an uncoupled front-end/back-end to make it a whole lot easier to implement directly into the Ohio State Mobile App.

## Prerequisites
<ol>
  <li>Ensure Server Repository is set up. This is currently a private repo: (https://github.com/lukePetersen9/OSUMyChef-Server) </li>
<li>Node V14 or above is properly installed. (https://nodejs.org/en/download) </li>
<li>Ensure Expo Go is downloaded on your mobile device</li>
<li>Obtain our Google API Key </li>
</ol>

## Install

Step 1: Clone application repo into local file system

Step 2: Navigate to project repo.

Step 3: Create a new file named config.tsx and save this in the root directory of the repository. In this file add:
```
export const google_api_key= <Google API Key>
```

Step 4: In a terminal type the following:

```
npm install
```

After moule installation is complete type:
```
npm run start
```

If all prerequisites are installed, you should be greeted with a web page that looks like this:

![Alt text](doc/metro.png?raw=true "metro")

**Note: Ensure the Tunnel tab is selected rather than the LAN option.**



From here you scan the QR code with your mobile device to load the application into Expo Go.




### Developers

* Daniel Amar
* Nygiel Spann
* Luke Peterso
* Nate Yun


### Things left to do

* Update dependencies to remove all vulnerabilities
* Cleanup various areas of the code base
* Secure firestore key
* Get app integrated into OSU mobile app



