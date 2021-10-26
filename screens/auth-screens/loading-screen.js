// In App.js in a new project

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { CommonActions } from "@react-navigation/native";
import { get } from "../../firebase-services/networking/network";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/user-action";

export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (u) => {
      console.log("User has stored info in the app");
      u ? console.log('true') : console.log('false')
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
  }, []);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
