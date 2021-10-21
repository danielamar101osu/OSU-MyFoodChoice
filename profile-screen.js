import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, SafeAreaView, Text, Modal, TouchableOpacity, Switch, ScrollView } from 'react-native';
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
import ProfileInitials from './profile-initials';

export default ProfileScreen = ({ closeProfileScreen }) => {
    const user = useSelector(state => state.user)
    return (
        <BlurView intensity={100} style={{ position: 'absolute', height: "100%", width: "100%" }}>
            <View style={{ paddingTop: 50 }}>

                <View style={{ height: '100%', paddingHorizontal: 10 }}>
                    <ScrollView>
                        <ProfileInitials size={150} />
                        <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginTop: 10 }}>About Me</Text>
                        <View
                            key={1}
                            style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>{user.firstName} {user.lastName}.{user.dotNumber}</Text>
                            <Feather name='edit' size={20} color='black' />
                        </View>
                        <View
                            key={2}
                            style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Height: {user.height}</Text>
                            <Feather name='edit' size={20} color='black' />
                        </View>
                        <View
                            key={3}
                            style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Weight: {user.weight}</Text>
                            <Feather name='edit' size={20} color='black' />
                        </View>
                        <View
                            key={4}
                            style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderRadius: 20 }}>
                            <View
                                style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20, marginRight: 10 }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>Dining Dollars:   ${user.diningDollars}</Text>
                            </View>
                            <View
                                style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20, marginLeft: 5 }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>BuckID Cash:   ${user.buckIDCash}</Text>
                            </View>
                        </View>

                        <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginTop: 10 }}>Allergies</Text>
                        {Object.keys(user.allergies).map(el =>
                            <View
                                key={user.allergies[el].name}
                                style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>{user.allergies[el].name}</Text>
                                <Switch value={user.allergies[el].value} />
                            </View>)}
                        <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginTop: 10 }}>Dietary Restrictions</Text>
                        {Object.keys(user.restrictions).map(el =>
                            <View
                                key={user.restrictions[el].name}
                                style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>{user.restrictions[el].name}</Text>
                                <Switch value={user.restrictions[el].value} />
                            </View>)}
                    </ScrollView>

                </View>
            </View>
            <TouchableOpacity
                style={{ padding: 10, position: 'absolute', marginTop: 50, right: 20 }}
                onPress={closeProfileScreen}>
                <Ionicons name="ios-close" size={40} color="black" />
            </TouchableOpacity>
        </BlurView>
    );
}