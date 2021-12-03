
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

## Architecture 

```
This file tree explains all files in this codebase from a high level perspective 

├── App.js <-- App entry point
├── README.md
├── app.json <-- App metadata
├── assets 
│   ├── *.png <-- expo static assets
│   └── static <-- test data to mock different functionalities. Kept in codebase for future group in case they need it.
│       ├── locations.js <-- test data
│       ├── meals.js <-- Generates test data
│       ├── orders.js <-- test data
│       ├── other.js <-- test data
│       └── snacks.js <-- test data
├── babel.config.js <-- js compiler options
├── components <-- various components used in app
│   ├── food-info-modal.js <-- Template for view displayed upon clicking on a food list item on meal/snack screens
│   ├── food-list-item.js <-- Template for each food displayed on meal/snack screens
│   ├── nutrition-label.js <-- Exports a nutrition label
│   ├── profile-initials.js <-- Responsible for initials within circle that is pressable to display user profile on home screen
│   └── totals-history.js <-- responsbile for graph views of food history
├── config.tsx <-- stores google API key
├── package-lock.json <-- locks app metadata
├── package.json <-- App + dependency metadata 
├── redux <-- state management
│   ├── actions
│   │   ├── food-action.js <-- various methods for changing local food info
│   │   └── user-action.js <-- various methods for changing local user info
│   └── reducers
│       ├── food-reducer.js <-- various methods for viewing local food info
│       └── user-reducer.js <-- various methods for viewing local user info
├── screens
│   ├── auth-screens
│   │   ├── loading-screen.js <-- Responsible for loading view. Checks if a user is logged in.
│   │   ├── login-screen.js <-- Responsible for login view.
│   │   └── sign-up-screen.js <-- Responible for sign up view. Validates user information and sends requests to server.
│   └── home-screens
│       ├── dinner-screen.js <-- dinner subscreen displayed in the home screen.
│       ├── history-screen.js <-- history subscreen displayed in the home screen.
│       ├── home-screen.js <-- Main screen upon login. 
│       ├── profile-screen.js <-- User profile screen that displayed user preferences and info.
│       └── snack-screen.js <-- nack subscreen displayed in the home screen.
├── services
│   ├── functions
│   │   └── common.js <-- helper function to calculate distance between two points
│   └── networking 
│       └── network.js <-- Exported methods that can be used to interact with backend
├── tsconfig.json <-- Typescript compilation options
```


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



