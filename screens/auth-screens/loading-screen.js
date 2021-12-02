import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { CommonActions } from '@react-navigation/native';
import { get } from '../../services/networking/network';
import { useDispatch } from 'react-redux';
import { setUser, updateLocation } from '../../redux/actions/user-action';
import * as Location from 'expo-location';

/**
 * Checks stored local user information to determine next screen to load
 * 
 * @returns 
 *    A loading view
 */
export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();

  async function checkStatusAndLogin(u, loginScreen) {
    console.log('Checking Status...');
    if (u) {
      console.log('Local user info found...');
      //Retrieve user information from server
      let user = await get("/users/:uid", {});
      if (!user) {
        console.log('Remote user info not found.. Routing to login.')
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Login" }],
          })
        );
      } else {
        console.log('Remote user info found! Routing to home.')
        dispatch(setUser(user));
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }],
            })
          );
        }, 1000);

      }

    } else if (loginScreen) {
      console.log('Local user info not found... Routing to loogin screen.');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Login" }],
        })
      );
    }
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      unsubscribe();
      checkStatusAndLogin(u, true);
    }, (e) => { console.log('error', e); }, (c) => { console.log('complete', c); });
  }, []);

  useEffect(() => {
    (async () => {
      //Ask user if we can have location data
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //Get coordinates
      let location = await Location.getLastKnownPositionAsync({});

      //Update local state
      dispatch(updateLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }));
    })();
  }, []);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 20, marginBottom: 10 }}>OSU My Food Choice</Text>
      <ActivityIndicator size='large' style={{ marginTop: 10 }} />
    </View>
  );
}
