// In App.js in a new project

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import * as firebase from 'firebase'
import { get } from '../../services/networking/network';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function signIn() {

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.navigate('Loading')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ padding: 40, width: '100%', alignItems: 'center' }}>
        <Image source={require('../../assets/images/blocko.png')} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
        <Text style={{ fontFamily: 'Nunito-Light', fontSize: 30, width: '100%' }}>Login</Text>
        <TextInput placeholder='email' style={{ width: "80%", borderWidth: 1, padding: 10, fontSize: 15 }} onChangeText={c => setEmail(c)} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }}></TextInput>
        <TextInput placeholder='password' secureTextEntry style={{ width: "80%", borderWidth: 1, padding: 10, fontSize: 15 }} onChangeText={c => setEmail(c)} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }} onChangeText={c => setPassword(c)}></TextInput>
        <TouchableOpacity onPress={signIn} style={{ backgroundColor: 'rgba(200, 10,10,.5)', width: '40%', justifyContent: "center", alignItems: 'center', padding: 14, borderRadius: 10, marginTop: 10 }}><Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 20 }}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }} style={{ margin: 30 }}><Text style={{ fontFamily: 'Nunito-Regular', color: 'gray', fontSize: 15 }}>Don't have an account? Sign Up Here</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
