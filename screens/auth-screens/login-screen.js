// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextField, TextInput, SafeAreaView } from 'react-native';
import { auth } from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FBWrapper from '../../firebase-services/FBWrapper'
import * as firebase from 'firebase'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function signUp() {
    try {
      let user = await firebase.auth().createUserWithEmailAndPassword('derin161@gmail.com', 'password')
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
  async function signIn() {
    console.log(email, password)
    try {
      let user = await firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.navigate('Home')
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    // signUp()
    //  signOut() 
    // if(firebase.auth().currentUser){
    //   navigation.navigate('Home')
    // }
  }, [])
  return (
    <SafeAreaView>
      <Text>Login</Text>
      {/* <TextField /> */}
      <TextInput placeholder='email' style={{ width: "80%", borderWidth: 1, padding: 10, fontSize: 15 }} onChangeText={c => setEmail(c)}></TextInput>
      <TextInput placeholder='password' style={{ width: "80%", borderWidth: 1, padding: 10, fontSize: 15 }} onChangeText={c => setPassword(c)}></TextInput>
      <TouchableOpacity onPress={signIn} ><Text>Go Home!</Text></TouchableOpacity>
    </SafeAreaView>
  );
}
