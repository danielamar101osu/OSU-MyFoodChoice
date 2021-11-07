import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Animated, View, ScrollView, Alert, Modal, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import { google_api_key } from '../config';
import NutritionLabel from './nutrition-label';
import { post } from '../services/networking/network';

export default function FoodInfoModal({ selectedItem, modalVisible, setModalVisible, locationData }) {
    const user = useSelector(state => state.user)
    const meals = useSelector(state => state.food.meals)
    const [alert, setAlert] = useState('Order Saved!')
    const [distance, setDistance] = useState(0)
    const fadeAnim = useRef(new Animated.Value(100)).current;

    const [region, setRegion] = useState({
        latitude: 40,
        longitude: -83,
        latitudeDelta: 0.04,
        longitudeDelta: 0.0421,
    })
    const saveFood = async () => {
        setModalVisible(!modalVisible);
        console.log({ locationId: locationData, foodId: selectedItem.id })
        let res = await post(`/users/:uid/orders`, { location_id: locationData, food_id: selectedItem.id })
        console.log(res)
        setAlert(res.includes('Successfully') ? 'Order Saved!' : 'Error saving order')
        Animated.sequence([Animated.spring(fadeAnim, {
            toValue: -80,
            duration: 2000,
            useNativeDriver: true
        }), Animated.spring(fadeAnim, {
            toValue: 100,
            duration: 2000,
            useNativeDriver: true
        })]).start();

    }

    useEffect(() => {
        setRegion(user.location)
    }, [user.location])

    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 0 }}>
            {modalVisible ?
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        marginTop: 0,
                        backgroundColor: '#fefdfc',
                        borderRadius: 20,
                        padding: 20,
                        display: 'flex',
                        paddingTop: 70,
                        alignItems: 'flex-start',
                        shadowColor: '#000',
                        width: Dimensions.get("window").width,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <View><Text style={{ fontFamily: 'Nunito-Bold', fontSize: selectedItem.data.formalName.length > 15 ? selectedItem.data.formalName.length > 24 ? 20 : 25 : 35, marginTop: 10 }}>{selectedItem.data.formalName}</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 10, marginBottom: 30 }}>{meals.location.data.name} - {Math.round(distance * 10) / 10} mi</Text>
                            </View>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Ionicons name="ios-close" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ height: "87%" }}>

                            {user.location.latitude == 0 || Platform.OS != 'ios' ? <View></View> :
                                <MapView style={{ height: 350, width: 350, borderRadius: 20, marginHorizontal: 10 }}
                                    initialRegion={region}
                                    scrollEnabled={true}
                                    region={{ ...region, latitude: meals.location.data.lat, longitude: meals.location.data.long }}>
                                    <MapViewDirections
                                        strokeColor="#BB0000"
                                        strokeWidth={3}
                                        onReady={(d) => {
                                            setDistance(d.distance * 0.621371)
                                        }}
                                        origin={{
                                            latitude: user.location.latitude, longitude: user.location.longitude
                                        }}
                                        destination={{ latitude: meals.location.data.lat, longitude: meals.location.data.long }}
                                        apikey={google_api_key}
                                    />
                                </MapView>}
                            <NutritionLabel data={selectedItem.data} />
                        </ScrollView>
                        <TouchableOpacity
                            onPress={saveFood}
                            style={{
                                backgroundColor: '#e9e1c4',
                                shadowColor: '#000',
                                shadowOffset: { width: 1, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 5,
                                elevation: 5,
                                position: 'absolute',
                                padding: 10,
                                borderRadius: 60, bottom: 70, right: 40, height: 80, width: 80, justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Ionicons name="add-outline" size={60} color="white" style={{ marginLeft: 2 }} />
                        </TouchableOpacity>
                    </View>
                </Modal> : null}
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: 100,
                    bottom: 0,
                    right: 100,
                    borderRadius: 15,
                    transform: [{ translateY: fadeAnim }],
                    backgroundColor: alert.includes('Error') ? 'rgba(230,10,10,.8)' : 'rgba(10,230,10,.8)',
                    padding: 20,
                }}
            >
                <Text style={{}}>{alert}</Text>
            </Animated.View>
        </View>
    );
}