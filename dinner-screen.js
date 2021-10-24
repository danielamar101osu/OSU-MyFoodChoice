import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Alert, Modal, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Ionicons, Feather } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { LoadingScreen } from './loading-modal';
import { useDispatch, useSelector } from 'react-redux';
import getMeals from './assets/static/meals';
import { setMeals } from './redux/actions/food-action';

export default function DinnerScreen() {
    const user = useSelector(state => state.user)
    const meals = useSelector(state => state.food.meals)
    const dispatch = useDispatch()

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        id: 4,
        name: '',
        imageUrl: '',
        ingredients: '',
        grubhub: '',
        nutrition: {
            calories: Math.floor(Math.random() * 1000),
            saturatedFat: Math.floor(Math.random() * 30),
            transFat: Math.floor(Math.random() * 10),
            cholesterol: Math.floor(Math.random() * 50),
            sodium: Math.floor(Math.random() * 1000),
            totalCarbs: Math.floor(Math.random() * 100),
            fiber: Math.floor(Math.random() * 20),
            protein: Math.floor(Math.random() * 50),
            sugars: Math.floor(Math.random() * 50),
            calcium: Math.floor(Math.random() * 500),
            iron: Math.floor(Math.random() * 100),
            vitaminC: Math.floor(Math.random() * 10),
        },
        location: {
            latitude: 40,
            longitude: -83,
            latitudeDelta: 0.04,
            longitudeDelta: 0.0421,
        }
    })

    const [distance, setDistance] = useState(0)
    const [region, setRegion] = useState({
        latitude: 40,
        longitude: -83,
        latitudeDelta: 0.04,
        longitudeDelta: 0.0421,
    })

    async function fetchMeals() {
        let response = await getMeals()
        dispatch(setMeals(response))
    }

    useEffect(() => {

        fetchMeals()
    }, [])
    useEffect(() => {
        setRegion(user.location)
    }, [user.location])
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDW6B-EPyltDyvm_hpK74yyoIyw2qw4jJA';
    return (
        <View style={styles.centeredView}>
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
                        <View><Text style={{ fontFamily: 'Nunito-Bold', fontSize: 35 }}>{selectedItem.name}</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 25, marginLeft: 10 }}>{selectedItem.location.name} - {Math.round(distance * 10) / 10} mi</Text>
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
                        <ScrollView
                            style={{ marginVertical: 20, height: 400 }}
                            horizontal={true}
                            decelerationRate={0}
                            snapToInterval={370} //your element width
                            snapToAlignment={"center"}
                        >
                            <Image
                                style={{ width: 350, height: 350, borderRadius: 20, marginHorizontal: 10 }}
                                source={{ uri: selectedItem.imageUrl }} />
                            {user.location.latitude == 0 ? <View></View> : <MapView style={{ height: 350, width: 350, borderRadius: 20, marginHorizontal: 10 }}
                                initialRegion={region}
                                scrollEnabled={false}
                                region={{ ...region, latitude: selectedItem.location.latitude, longitude: selectedItem.location.longitude }}>
                                <MapViewDirections
                                    strokeColor="#BB0000"
                                    strokeWidth={3}
                                    onReady={(d) => {
                                        setDistance(d.distance * 0.621371)
                                    }}
                                    origin={{
                                        latitude: user.location.latitude, longitude: user.location.longitude
                                    }}
                                    // {latitude: selectedItem.location.latitude, longitude: selectedItem.location.longitude}
                                    destination={{ latitude: selectedItem.location.latitude, longitude: selectedItem.location.longitude }}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                />
                            </MapView>}
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 35, marginBottom: 10 }}>Nutrition</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 18, marginLeft: 20, alignItems: 'center' }}>Amount per serving</Text></View>
                        <View style={{ borderBottomWidth: 3, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 25, marginLeft: 10 }}>Calories</Text>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30 }}>{selectedItem.nutrition.calories}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Fat</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.nutrition.saturatedFat + selectedItem.nutrition.transFat}g</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Trans Fat</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.nutrition.transFat}g</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Saturated Fat</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.nutrition.saturatedFat}g</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Fat</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.nutrition.saturatedFat + selectedItem.nutrition.transFat}g</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Trans Fat</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.nutrition.transFat}g</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Saturated Fat</Text>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.nutrition.saturatedFat}g</Text>
                        </View>
                    </ScrollView>
                </View>

            </Modal>
            {meals.length == 0 ? <TouchableOpacity onPress={fetchMeals}><Text>LOADING</Text></TouchableOpacity> : null}
            <FlatList data={meals}
                style={{ width: "100%", paddingHorizontal: 10 }}
                keyExtractor={item => item.id}
                renderItem={(item) => {
                    return <TouchableOpacity onPress={() => {
                        setSelectedItem(item.item)
                        setModalVisible(true);
                    }}><View
                        key={item.item.id} style={{
                            marginBottom: 20,
                            backgroundColor: '#e9e1c4',
                            width: "100%",
                            height: 300,
                            borderRadius: 20
                        }}>
                            <Image
                                style={{ flex: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                                source={{ uri: item.item.imageUrl }} />

                            <View style={{ flex: 1, borderRadius: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <View style={{ justifyContent: 'space-evenly', height: "100%", flexDirection: 'column' }}>
                                    <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 20, color: '#111111' }}>{item.item.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="ios-location" size={18} color="#333333" style={{ marginHorizontal: 8 }} />
                                        <Text style={{ fontFamily: 'Nunito-Light' }}>{item.item.location.name} -  mi</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'Nunito-SemiBold' }}>{item.item.nutrition.calories}</Text>
                                    <Text style={{ fontSize: 12, fontFamily: 'Nunito-Light' }}>calories</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                }}>
            </FlatList>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    modalView: {
        marginTop: 0,
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 35,
        flex: 1,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});