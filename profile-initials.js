import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, SafeAreaView, Text, Modal, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DinnerScreen from './dinner-screen';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import userReducer from './redux/reducers/user-reducer';
import { LoadingScreen } from './loading-modal';
import { BlurView } from 'expo-blur';
import meals from './assets/static/meals';
import foodReducer from './redux/reducers/food-reducer';

export default ProfileInitials = ({ showProfile, size, right, top }) => {
    const user = useSelector(state => state.user)
    return (
        <View style={{ borderRadius: 500, backgroundColor: '#e9e1c4', padding: 3, height: size, width: size, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <TouchableOpacity onPress={showProfile}>
                <Text style={{ fontSize: size / 1.7, fontFamily: 'Nunito-Bold' }}>{user.firstName.slice(0, 1).toUpperCase() + user.lastName.slice(0, 1).toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    );
}