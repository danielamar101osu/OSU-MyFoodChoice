import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text, TouchableOpacity, TextInput, Modal, SafeAreaView, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { post } from '../../services/networking/network';
import DropDownPicker from 'react-native-dropdown-picker';

/**
 * This screen is in charge of displaying 
 * the sign up screen, processing sign up information
 * and error handling/input validation.
 */
export default function SignUpScreen({ navigation }) {

  //User credentials store
  const [userInfo, setUserInfo] = useState(
    {
      email: '',
      firstName: '',
      lastName: '',
      dotNumber: '',
      weight: '',
      height: '',
      heightFoot: '',
      heightInch: '',
      password: '',
      confirmPassword: ''
    });

  //Error stores
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState('');

  const englishMap = {
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    dotNumber: 'Dot Number',
    weight: 'Weight',
    height: 'Height',
    confirmPassword: 'Confirmation Password',
    password: 'Password',
    heightFoot: 'Height In Feet',
    heightInch: 'Height in Inches'
  };

  //Height Feet dropdown variables
  const [heightInchOpen, setHeightInchOpen] = useState(false);
  const [heightInchValue, setHeightInchValue] = useState(null);
  const [heightInchItem, setHeightInchItem] = useState([
    { label: '0 in', value: '0' },
    { label: '1 in', value: '1' },
    { label: '2 in', value: '2' },
    { label: '3 in', value: '3' },
    { label: '4 in', value: '4' },
    { label: '5 in', value: '5' },
    { label: '6 in', value: '6' },
    { label: '7 in', value: '7' },
    { label: '8 in', value: '8' },
    { label: '9 in', value: '9' },
    { label: '10 in', value: '10' },
    { label: '11 in', value: '11' },
  ]);

  //Height Inches dropdown variables
  const [heightFootOpen, setHeightFootOpen] = useState(false);
  const [heightFootValue, setHeightFootValue] = useState(null);
  const [heightFootItem, setHeightFootItem] = useState([
    { label: '4 ft', value: '4' },
    { label: '5 ft', value: '5' },
    { label: '6 ft', value: '6' },
    { label: '7 ft', value: '7' },
    { label: '8 ft', value: '8' },
  ]);

  /**
   * Validates signup information, displays error modal is there is a problem
   */
  async function validateSignUp() {

    for (const [key, value] of Object.entries(userInfo)) {

      //skip height as its intended to be empty
      if (key != 'height' && (!value || value.length == 0)) {
        setErrorMessage(`Please enter your ${englishMap[key]}`);
        setModalVisible(true);
        return;
      }
    }

    // Ex: 4ft * 12 + 3 inches = 51inch height
    const totalHeight = (parseInt(userInfo.heightFoot) * 12) + parseInt(userInfo.heightInch);

    //Set real height after its confirmed to exist
    setUserInfo({ ...userInfo, height: String(totalHeight) });
    userInfo.height = String(totalHeight);

    if (userInfo.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters!');
      setModalVisible(true);
      return;
    }
    if (userInfo.confirmPassword != userInfo.password) {
      setErrorMessage('Passwords dont match!');
      setModalVisible(true);
      return;
    }

    await signUp();
  }

  /**
   * Create a user in firestore and route to loading screen
   * TODO: Cleanup this method, remove promise antipattern
   */ 
  async function signUp() {
    try {

      //Create firebase user
      await firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(() => {
          //Populate specific user collection
          post('/users/:uid', userInfo);

          console.log('signed up successfully');

          //Route to signin
          signIn();

        }).catch((e) => {
          const errorCode = e.code;

          if (errorCode == 'auth/email-already-in-use') {
            setErrorMessage('Email is already in use!');
            setModalVisible(true);
            return;
          }

          if (errorCode == 'auth/invalid-email') {
            setErrorMessage('Invalid email!');
            setModalVisible(true);
            return;
          }

          if (errorCode == 'auth/weak-password') {
            setErrorMessage('Weak Password! Please enter something strong.');
            setModalVisible(true);
            return;
          }

        });

    } catch (e) {
      console.log(`Error signing in/signing up: ${e}`);
    }
  }

  async function signIn() {
    try {
      await firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);
      console.log('Logged in. Routing to loading screen...');
      navigation.navigate('Loading');
    } catch (e) {
      console.log(e);
    }
  }

 //Sign up screen view React CSS
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, width: '100%' }} >
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{errorMessage}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Ok!</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

        </View>

        <View style={{ padding: 40, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Nunito-Light', fontSize: 30, width: '100%', textAlign: 'center' }}>Sign Up</Text>
          <TextInput placeholder='First name' onChangeText={c => setUserInfo({ ...userInfo, firstName: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }}></TextInput>
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'baseline' }}>
            <TextInput placeholder='Last name' onChangeText={c => setUserInfo({ ...userInfo, lastName: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 4 }}></TextInput>
            <Text style={{ fontSize: 40, marginHorizontal: 6 }}>.</Text>
            <TextInput placeholder='dot #' keyboardType={'number-pad'} onChangeText={c => setUserInfo({ ...userInfo, dotNumber: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 1 }}></TextInput>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', zIndex: 1 }}>
            {/* Height in feet dropdwon picker */}
            <DropDownPicker
              placeholder="Feet"
              zIndex={1000}
              zIndexInverse={3000}
              open={heightFootOpen}
              value={heightFootValue}
              items={heightFootItem}
              setOpen={setHeightFootOpen}
              setValue={setHeightFootValue}
              setItems={setHeightFootItem}
              listMode="SCROLLVIEW"

              containerStyle={{ width: "30%", opacity: 1 }}
              dropDownContainerStyle={{ opacity: 1, marginBottom: 20 }}
              style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 0, flex: 1, opacity: 1 }}
              onChangeValue={c => setUserInfo({ ...userInfo, heightFoot: c })}
            />
            <DropDownPicker
              placeholder="Inches"
              zIndex={1000}
              zIndexInverse={3000}
              open={heightInchOpen}
              value={heightInchValue}
              items={heightInchItem}
              setOpen={setHeightInchOpen}
              setValue={setHeightInchValue}
              setItems={setHeightInchItem}
              listMode="SCROLLVIEW"
              containerStyle={{ width: "30%" }}
              style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 0, flex: 1, marginStart: 4, marginEnd: 4 }}
              onChangeValue={c => setUserInfo({ ...userInfo, heightInch: c })}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <TextInput placeholder='Weight' keyboardType={'number-pad'} onChangeText={c => setUserInfo({ ...userInfo, weight: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 5, flex: 1, marginStart: 8, marginEnd: 2 }}></TextInput>
              <Text style={{ fontSize: 20, }}>lbs</Text>
            </View>
          </View>

          <TextInput placeholder='Email' onChangeText={c => setUserInfo({ ...userInfo, email: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }}></TextInput>

          <TextInput placeholder='Password' secureTextEntry onChangeText={c => setUserInfo({ ...userInfo, password: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }} ></TextInput>
          <TextInput placeholder='Confirm Password' secureTextEntry onChangeText={c => setUserInfo({ ...userInfo, confirmPassword: c })} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, width: "100%", height: 50, padding: 5 }} ></TextInput>
          <TouchableOpacity onPress={validateSignUp} style={{ backgroundColor: 'rgba(200, 10,10,.5)', width: '40%', justifyContent: "center", alignItems: 'center', padding: 20, borderRadius: 10 }}><Text style={{ fontFamily: 'Nunito-Regular', color: 'white', fontSize: 20 }}>Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Login'); }} style={{ margin: 30 }}><Text style={{ fontFamily: 'Nunito-Regular', color: 'gray', fontSize: 15 }}>Already have an account? Login Here</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
