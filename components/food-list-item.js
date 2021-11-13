import React, { } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getDistanceFromLatLonInMi } from '../services/functions/common';

export default function FoodListItem({ setModalVisible, setSelectedItem, item }) {
    const user = useSelector(state => state.user);
    const meals = useSelector(state => state.food.meals);

    return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(item.item);
            setModalVisible(true);
        }}><View
            key={item.item.id} style={{
                marginBottom: 20,
                backgroundColor: 'rgba(200, 10,10,.3)',
                width: "100%",
                borderRadius: 10,
                marginTop: item.index == 0 ? 20 : 0
            }}>
                <View style={{ flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <View style={{ justifyContent: 'space-evenly', height: "100%", flexDirection: 'column' }}>
                        <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 20, color: '#111111' }}>{item.item.data.formalName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <Ionicons name="ios-location" size={18} color="#333333" style={{ marginHorizontal: 8 }} />
                            <Text style={{ fontFamily: 'Nunito-Light' }}>{meals.location.data.name} - {getDistanceFromLatLonInMi(meals.location.data, user.location)}mi</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'Nunito-SemiBold' }}>{item.item.data.kcalValue}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Nunito-Light' }}>calories</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>

    );
}
