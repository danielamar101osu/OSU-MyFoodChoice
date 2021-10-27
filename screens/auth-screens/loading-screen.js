// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import { CommonActions } from '@react-navigation/native';
import { get } from '../../firebase-services/networking/network';
import { useDispatch } from 'react-redux';
import { setUser, updateLocation } from '../../redux/actions/user-action';
import * as Location from 'expo-location';

export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // (async () => {
    //   let user = await get('/users/:uid', {})
    //   console.log('dff', user)
    // })();
    firebase.auth().onAuthStateChanged(async (u) => {
      console.log("U is:", u ? u.uid : 'null')
      if (u) {
        let user = await get("/users/:uid", {});
        console.log("Gotten User is:");
        console.log(user);
        if (!user) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Login" }],
            })
          );
        } else {
          dispatch(setUser(user));
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }],
            })
          );
        }
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Login" }],
          })
        );
      }
    });
  }, [])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
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
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
