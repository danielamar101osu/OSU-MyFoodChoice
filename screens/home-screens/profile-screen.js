import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import ProfileInitials from '../../components/profile-initials';
import * as firebase from 'firebase'
import { updateAllergy, updateRestriction, updateUser } from '../../redux/actions/user-action';
import { put } from '../../services/networking/network';
import DropDownPicker from 'react-native-dropdown-picker';

async function setHeightValues(){

    
}

export default function ProfileScreen({ closeProfileScreen, navigation }) {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [showEditModal, setShowEditModal] = useState([])
    const [editValues, setEditValues] = useState({})

        //Height Feet dropdown data
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

    //Height Inches dropdown data
    const [heightFootOpen, setHeightFootOpen] = useState(false);
    const [heightFootValue, setHeightFootValue] = useState(null);
    const [heightFootItem, setHeightFootItem] = useState([
        { label: '4 ft', value: '4' },
        { label: '5 ft', value: '5' },
        { label: '6 ft', value: '6' },
        { label: '7 ft', value: '7' },
        { label: '8 ft', value: '8' },
    ]);


    var heightFoot = Math.trunc(user.height / 12);
    var heightInch =  user.height % 12;
    const heightFootStr = heightFoot.toString() + ' ft'
    const heightInchStr = heightInch.toString() + ' in'
    console.log('Set heights to defaultvalues')
    

    async function signOut() {
        try {
            await firebase.auth().signOut()
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'Loading' },
                    ],
                })
            );
            console.log('signed out.')
        } catch (e) {
            console.log(e)
        }
    }

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
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => setShowEditModal([
                                { key: 'firstName', label: 'first name', type: 'default' },
                                { key: 'lastName', label: 'last name', type: 'default' },
                                { key: 'dotNumber', label: 'dot number', type: 'number-pad' },]
                            )}>
                                <Feather name='edit' size={20} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View
                            key={2}
                            style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Height </Text>
                            <DropDownPicker
                                placeholder= {heightFootStr}
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
                                dropDownContainerStyle={{ opacity: 1, marginBottom: 20, backgroundColor: '#e9e1c4' }}
                                style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, height: 50, padding: 0, flex: 1, opacity: 1 }}
                                onChangeValue={(val) => {
                                    heightFoot = val
                                    let temp = { ...editValues }
                                    temp['height'] = ((parseInt(val) * 12) + parseInt(heightInch)).toString();
                                    setEditValues(temp)
                                    console.log(editValues)
                                    put('/users/:uid', editValues)

                                    }
                                    }
                             />
                            <DropDownPicker
                                placeholder={heightInchStr}
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
                                onChangeValue={(val) => {
                                    let temp = { ...editValues }
                                    heightInch = val
                                    temp['height'] = ((parseInt(heightFoot) * 12) + parseInt(val)).toString();
                                    setEditValues(temp)
                                    console.log(editValues)
                                    put('/users/:uid', editValues)
                                    
                                }
                                }
                            />
                            {/* <TouchableOpacity style={{ padding: 5 }} onPress={() => setShowEditModal(
                                [
                                    { key: 'height', label: 'height', type: 'number-pad' },
                                ]
                            )}>
                                <Feather name='edit' size={20} color='black' />
                            </TouchableOpacity> */}
                        </View>
                        <View
                            key={3}
                            style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Weight: {user.weight} lbs</Text>
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => setShowEditModal(
                                [
                                    { key: 'weight', label: 'weight', type: 'number-pad' },
                                ]
                            )}>
                                <Feather name='edit' size={20} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View
                            key={4}
                            style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderRadius: 20 }}>
                            <View
                                style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20, marginRight: 10 }}>
                                <TouchableOpacity style={{ padding: 5 }} onPress={() => setShowEditModal(
                                    [
                                        { key: 'diningDollars', label: 'Dining Dollars', type: 'numeric' },
                                    ]
                                )}>
                                    <Text style={{ color: 'black', fontSize: 12 }}>Dining Dollars:   ${user.diningDollars}</Text>
                                </TouchableOpacity>
                            </View>
                            <View

                                style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20, marginLeft: 5 }}>
                                <TouchableOpacity style={{ padding: 5 }} onPress={() => setShowEditModal(
                                    [
                                        { key: 'buckIDCash', label: 'Buck ID Cash', type: 'numeric' },
                                    ]
                                )}>
                                    <Text style={{ color: 'black', fontSize: 12 }}>BuckID Cash:   ${user.buckIDCash}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginTop: 10 }}>Allergies</Text>
                        {Object.keys(user.allergies).map(el =>
                            <View
                                key={el}
                                style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>{el.split('').map((letter, ind) => letter == letter.toLowerCase() ? (ind == 0 ? letter.toUpperCase() : letter) : ' ' + letter).join('')}</Text>
                                <Switch value={user.allergies[el]} onChange={() => {
                                    let val = { allergies: {} }
                                    val.allergies[el] = !user.allergies[el]
                                    put('/users/:uid', val)
                                    dispatch(updateAllergy(el))
                                }} />
                            </View>)}
                        <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginTop: 10 }}>Dietary Restrictions</Text>
                        {Object.keys(user.restrictions).map(el =>
                            <View
                                key={el}
                                style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 7, marginVertical: 5, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20 }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>{el.split('').map((letter, ind) => letter == letter.toLowerCase() ? (ind == 0 ? letter.toUpperCase() : letter) : ' ' + letter).join('')}</Text>
                                <Switch value={user.restrictions[el]} onChange={() => {
                                    let val = { restrictions: {} }
                                    val.restrictions[el] = !user.restrictions[el]
                                    put('/users/:uid', val)

                                    dispatch(updateRestriction(el))
                                }} />
                            </View>)}
                        <TouchableOpacity onPress={signOut} style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: 'rgba(200,0,0,.8)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 60, marginTop: 34, marginBottom: 50 }}>
                            <Text style={{ fontFamily: 'Nunito-Light', fontSize: 25, color: 'white' }}>Log Out</Text>
                        </TouchableOpacity>
                    </ScrollView>

                </View>
            </View>
            <TouchableOpacity
                style={{ padding: 10, position: 'absolute', marginTop: 50, right: 20 }}
                onPress={closeProfileScreen}>
                <Ionicons name="ios-close" size={40} color="black" />
            </TouchableOpacity>
            <Modal transparent={true} visible={showEditModal.length > 0} animationType='slide'>
                <BlurView intensity={100} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ height: "80%", width: '95%', justifyContent: 'flex-start', backgroundColor: '#e9e1c4', borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                        {showEditModal.map((el, ind) => (<View id={el.key}>
                            <Text style={{ fontSize: 20, fontFamily: 'Nunito-Regular', marginLeft: 10, marginTop: ind == 0 ? 40 : 10 }}>Edit your {el.label}:</Text>
                            <TextInput keyboardType={el.type} returnKeyType='done' defaultValue={user[el.key] + ''} onChangeText={(val) => {
                                let temp = { ...editValues }
                                temp[el.key] = val
                                setEditValues(temp)
                            }} style={{ height: 50, backgroundColor: 'white', marginVertical: 5, marginHorizontal: 20, borderRadius: 20, paddingHorizontal: 10, fontSize: 20, fontFamily: 'Nunito-Regular' }} />

                        </View>))}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowEditModal([])
                                    setEditValues({})
                                }}
                                style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: 'rgba(200,0,0,.7)', width: '40%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 25, color: 'white' }}>cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setShowEditModal([])

                                console.log('Edited Profile values', editValues)
                                put('/users/:uid', editValues)
                                dispatch(updateUser(editValues))
                            }} style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: 'rgba(0,200,0,.9)', width: '40%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 25, color: 'white' }}>save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </BlurView>
    );
}