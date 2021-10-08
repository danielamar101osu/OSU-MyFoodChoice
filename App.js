import React, { } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import userReducer from './redux/reducers/user-reducer';
import foodReducer from './redux/reducers/food-reducer';
import HomeScreen from './screens/home-screens/home-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './screens/auth-screens/loading-screen';
import * as firebase from'firebase'
import LoginScreen from './screens/auth-screens/login-screen';
const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer
})
const store = createStore(rootReducer);

const Stack = createNativeStackNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyBCjwYHTf9Yj1kAN7mByIhnA3rD0OZlzJY",
    authDomain: "osumyfoodchoiceapp-a8fd6.firebaseapp.com",
    databaseURL: "https://osumyfoodchoiceapp-a8fd6.firebaseio.com",
    projectId: "osumyfoodchoiceapp-a8fd6",
    storageBucket: "osumyfoodchoiceapp-a8fd6.appspot.com",
    messagingSenderId: "752614312654",
    appId: "1:752614312654:web:e3234a1c1c83e85a0dde9f",
    measurementId: "G-XKCPW0Q23G"
  });
}


export default function App() {
  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Loading'}>
            <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}