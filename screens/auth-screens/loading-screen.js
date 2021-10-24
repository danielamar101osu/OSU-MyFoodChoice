// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import { CommonActions } from '@react-navigation/native';
import { get } from '../../firebase-services/networking/network';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/user-action';


export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (u) => {
      console.log("U is:")
      console.log(u)
      if (u) {
        console.log('loggedin')
        let user = await get('/users/:uid', {})
        dispatch(setUser(user))
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Home' },
            ],
          })
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Login' },
            ],
          })
        );

      }
    });
  }, [])
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
