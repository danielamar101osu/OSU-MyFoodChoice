// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth } from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FBWrapper from '../../firebase-services/FBWrapper'
import * as firebase from 'firebase'

export default function LoadingScreen({ navigation }) {
  const [user, setUser] = useState(null)
  async function signUp() {
    try {
      let user = await firebase.auth().createUserWithEmailAndPassword('lukepetersen29@gmail.com', 'password')
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }
  async function signOut() {
    try {
      let user = await firebase.auth().signOut()
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    //  signOut() 
    // if(firebase.auth().currentUser){
    //   navigation.navigate('Home')
    // }else{
    //   navigation.navigate('Login')
    // }
    firebase.auth().onAuthStateChanged((u) => {
      console.log("dfs", u)
      if (u) {
        navigation.navigate('Home')
      } else {
        navigation.navigate('Login')

      }
    });
  }, [])
  useEffect(() => {
    console.log("got", user)
  }, [user])
  return (
    <View>
      <Text>Loading</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} ><Text>Go Home!</Text></TouchableOpacity>
    </View>
  );
}
