import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { createStore } from 'redux';
import userReducer from './redux/reducers/user-reducer';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { updateLocation } from './redux/actions/user-action';


export const LoadingScreen = ({ closeModal }) => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        closeModal(false)
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(updateLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }))
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View>
    </View>
  );

}