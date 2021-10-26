import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase'
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { post } from '../../firebase-services/networking/network';

export default function SignUpScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(
    { email: '',
      password: '',
      firstName: '',
      lastName: '',
      dotNumber: '',
      weight: '',
      height: '',
      password: '',
      confirmPassword: '' 
    })
  async function signUp() {
    console.log(`In signup, user info is ${userInfo}`);
    try {
      //Create firebase user
      await firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);

      //Populate 
      await post('/users/:uid',userInfo)

      console.log('signed up successfully')
      
      await signIn()

    } catch (e) {
      console.log(`Error signing in/signing up: ${e}`);
    }
  }
  async function signIn() {
    try {
      let user = await firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
      console.log('logged in', user)
      navigation.navigate('Home')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, width: '100%' }} >
        <ScrollView>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <View style={{  height: 100}}></View>
          <Text style={{ fontFamily: 'Nunito-Light', fontSize: 30, width: '100%', textAlign: 'center' }}>Sign Up</Text>
          <TextInput placeholder='first name' onChangeText={c => setUserInfo({ ...userInfo, firstName: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }}></TextInput>
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'baseline' }}>
            <TextInput placeholder='last name' onChangeText={c => setUserInfo({ ...userInfo, lastName: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 4 }}></TextInput>
            <Text style={{ fontSize: 40, marginHorizontal: 6 }}>.</Text>
            <TextInput placeholder='dot #' keyboardType={'number-pad'} onChangeText={c => setUserInfo({ ...userInfo, dotNumber: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 1 }}></TextInput>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'baseline' }}>
            <TextInput placeholder='height' keyboardType={'number-pad'} onChangeText={c => setUserInfo({ ...userInfo, height: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 1, marginEnd: 2 }}></TextInput>
            <Text style={{ fontSize: 20, }}>inches</Text>
            <TextInput placeholder='weight' keyboardType={'number-pad'} onChangeText={c => setUserInfo({ ...userInfo, weight: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 1, marginStart: 8, marginEnd: 2 }}></TextInput>
            <Text style={{ fontSize: 20, }}>lbs</Text>
          </View>
          <TextInput placeholder='email' onChangeText={c => setUserInfo({ ...userInfo, email: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }}></TextInput>

          <TextInput placeholder='password' secureTextEntry onChangeText={c => setUserInfo({ ...userInfo, password: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }} ></TextInput>
          <TextInput placeholder='confirm password' secureTextEntry onChangeText={c => setUserInfo({ ...userInfo, confirmPassword: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }} ></TextInput>
          <TouchableOpacity onPress={signUp} style={{ backgroundColor: 'rgba(200, 10,10,.5)', width: '40%', justifyContent: "center", alignItems: 'center', padding: 20, borderRadius: 10 }}><Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 20 }}>Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={{ margin: 30 }}><Text style={{ fontFamily: 'Nunito-Regular', color: 'gray', fontSize: 15 }}>Already have an account? Login Here</Text></TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
