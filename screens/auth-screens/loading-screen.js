// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import { CommonActions } from '@react-navigation/native';
import { get } from '../../services/networking/network';
import { useDispatch } from 'react-redux';
import { setUser, updateLocation } from '../../redux/actions/user-action';
import * as Location from 'expo-location';

export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (u) => {
      if (u) {
        let user = await get("/users/:uid", {});
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

      let location = await Location.getLastKnownPositionAsync({});
      dispatch(updateLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }))
    })();
  }, []);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#e9e1c4' }}>
      <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 20, marginBottom: 10 }}>OSU My Food Choice</Text>
      <ActivityIndicator size='large' style={{ marginTop: 10 }} />
    </View>
  );
}
