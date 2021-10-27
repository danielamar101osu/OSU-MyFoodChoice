import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Alert, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import getMeals from '../../assets/static/meals';
import { setMeals } from '../../redux/actions/food-action';
import { google_api_key } from '../../config';
import { get } from '../../firebase-services/networking/network';
// import { google_api_key } from '../../config';

export default function DinnerScreen() {
    const user = useSelector(state => state.user)
    const meals = useSelector(state => state.food.meals)
    const dispatch = useDispatch()

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})

    const [distance, setDistance] = useState(0)
    const [region, setRegion] = useState({
        latitude: 40,
        longitude: -83,
        latitudeDelta: 0.04,
        longitudeDelta: 0.0421,
    })

    async function fetchMeals() {
        // let response = await get(`/foods/getFoodsForUser/:uid/40.00462/-83.02803/0`, {})
        dispatch(setMeals({
            "location": {
                "id": "restaraunt_1",
                "data": {
                    "coords": {
                        "latitude": 40.00462,
                        "longitude": -83.02803
                    },
                    "name": "Parker Cafe"
                }
            },
            "foods": [
                {
                    "id": "SyDOLJXfApGLmlQO7zpK",
                    "data": {
                        "restrictions": [],
                        "caloriesFromSaturatedFatValue": 7.2,
                        "sodiumPercent": 2,
                        "proteinPercent": 21,
                        "field1": 82,
                        "formalName": "Power Green Salad",
                        "totalFatPercent": 15,
                        "totalCarbPercent": 10,
                        "sodiumMilligram": 45.7,
                        "totalFatGram": 9.6,
                        "addedSugarPercent": [
                            0
                        ],
                        "sugarTotalPercent": "0",
                        "kcalValue": 232,
                        "allergenList": " Soy,  TreeNuts",
                        "upc": 70000054351,
                        "sellPrice": 6.75,
                        "proteinGram": 10.6,
                        "ingredList": [
                            "KALE  (KALE), RED SEEDLESS GRAPE (RED GRAPES), BLUEBERRY (BLUEBERRIES), EDAMAME SOYBEAN (SOYBEANS), WHITE QUINOA, FRESH STRAWBERRY (STRAWBERRY), SLICED BLANCHED SHELL OFF ALMOND (ALMONDS, BLANCHED), WATER"
                        ],
                        "sugarTotalGram": 8.7,
                        "caloriesFromFatValue": 86.4,
                        "totalCarbGram": 29.8,
                        "addedSugarGram": [
                            0
                        ]
                    }
                },
                {
                    "id": "Bxnve4fmpmNpV3ypw9mb",
                    "data": {
                        "sugarTotalPercent": "0",
                        "totalCarbGram": 62.9,
                        "caloriesFromFatValue": 90.9,
                        "totalFatPercent": 16,
                        "sugarTotalGram": 44.5,
                        "allergenList": " Peanuts,  Soy",
                        "sellPrice": 2.75,
                        "caloriesFromSaturatedFatValue": 18,
                        "formalName": "Sliced Apples & Peanut Butter",
                        "sodiumPercent": 4,
                        "ingredList": [
                            "APPLES, SLICED (APPLE), SINGLE SERVE PEANUT BUTTER CUP (ROASTED PEANUTS AND SUGAR, CONTAINS 2 OR LESS OF: MOLASSES, FULLY HYDROGENATED VEGETABLE OILS RAPESEED AND SOYBEAN, MONO AND DIGLYCERIDES, SALT.)"
                        ],
                        "totalCarbPercent": 21,
                        "proteinGram": 5.8,
                        "restrictions": [],
                        "upc": 70200101000,
                        "proteinPercent": 12,
                        "sodiumMilligram": 91.1,
                        "totalFatGram": 10.1,
                        "kcalValue": 342.6,
                        "field1": 70
                    }
                },
                {
                    "id": "uOLTo1nCE23CNOpAFBAl",
                    "data": {
                        "formalName": "Italian Sub",
                        "totalFatPercent": 54,
                        "kcalValue": 680.1,
                        "restrictions": "['vegetarian', 'kosher', 'vegan', 'porkFree', 'beefFree']",
                        "caloriesFromFatValue": 317.7,
                        "sugarTotalPercent": "0",
                        "sugarTotalGram": 6.4,
                        "sodiumMilligram": 2709.3,
                        "allergenList": " Dairy,  Gluten,  Soy,  Wheat",
                        "totalFatGram": 35.3,
                        "proteinGram": 34.6,
                        "totalCarbGram": 65.9,
                        "sodiumPercent": 113,
                        "upc": 70120114014,
                        "totalCarbPercent": 22,
                        "ingredList": [
                            "White Sub Bun (Enriched Flour (unbleached Unbromated Wheat Flour, Malted Barley Flour, Niacin, Iron (reduced Iron), Thiamine Mononitrate, Riboflavin, Folic Acid), Water, Contains less than 2% of each of the following: Dough Conditioner (Wheat Flour, Enzymes, and Ascorbic Acid - Vit. C), Yeast, Sugar, Dough Strengthener/Emulsifier (Guar Gum, Wheat Flour, Mono-glycerides, Calcium Sulfate, Silicon Dioxide as Flow Aid, Enzymes (Contains Wheat), Salt), Wheat Gluten, Degerminated Yellow Cornmeal, Glaze Topping (Water, Vegetable Proteins, Vegetable Oil, Dextrose, Maltodextrin, Starch)), HAM (HAM CURED WITH: WATER, CONTAINS 2% OR LESS OF DEXTROSE, SALT, POTASSIUM LACTATE, SODIUM PHOSPHATES, SODIUM DIACETATE, SODIUM ERYTHORBATE, SODIUM NITRITE.), HAM, FALTERS HOT  (HAM, WATER, SALT, POTASSIUM LACTATE, SPICES, SUGAR, DEHYDRATED JALAPENO, RED PEPPER FLAKE, SODIUM PHOSPHATE, SODIUM DIACETATE, SODIUM ERYTHORBATE, SODIUM NITRITE), TOMATO, SLICED (TOMATO), SLICED HOT BANANA PEPPER (FRESH PEPPER, WATER, VINEGAR, SALT, CALCIUM CHLORIDE, SODIUM BENZOATE (PRESERVATIVE), NATURAL FLAVORS, YELLOW 5, SODIUM METABISULFITE. ), DRESSING, ITALIAN CREAMY SS POUCH (SOYBEAN OIL, WATER, VINEGAR, SUGAR, CONTAINS LESS THAN 2 OF SALT, GARLIC, XANTHAN GUM, ONIONS, POLYSORBATE 60, PROPYLENE GLYCOL ALGINATE, SPICE, RED BELL PEPPERS, GARLIC, PARSLEY, LEMON JUICE CONCENTRATE, CALCIUM DISODIUM EDTA AND POTASSIUM SORBATE AS PRESERVATIVES, NATURAL FLAVOR DRIED), SLICED PROVOLONE CHEESE (Provolone Cheese (Pasteurized Milk, Cheese Culture, Salt, Enzymes).), SALAMI HARD  (PORK, SALT, DEXTROSE, CONTAINS 2% OR LESS OF BEEF, FLAVORINGS, LACTIC ACID STARTER CULTURE, NATURAL SMOKE FLAVOR, SODIUM NITRITE, SPICE, VITAMIN C (SODIUM ASCORBATE), BHA, BHT, CITRIC ACID), SANDWICH PEPPERONI  (PORK, BEEF, SALT, CONTAINS 2% OR LESS OF WATER, DEXTROSE, SPICES, LACTIC ACID STARTER CULTURE, SODIUM ASCORBATE, OLEORESIN OF PAPRIKA, GARLIC POWDER, SODIUM NITRITE, BHA, BHT, CITRIC ACID), SLICED RED ONION (RED ONION), LETTUCE, ROMAINE SHREDDED (LETTUCE)"
                        ],
                        "sellPrice": 6.5,
                        "caloriesFromSaturatedFatValue": 91.8,
                        "field1": 68,
                        "proteinPercent": 69
                    }
                },
                {
                    "id": "E7w4QuM9Zzf6Z2hI4jbv",
                    "data": {
                        "proteinPercent": 4,
                        "sodiumMilligram": 288.5,
                        "upc": 70000121082,
                        "caloriesFromSaturatedFatValue": 23.4,
                        "ingredList": [
                            "BROCCOLI FLORETS (BROCCOLI), BABY CARROT (CARROTS), SEEDLESS CUCUMBER, DRESSING, RANCH ORIGINAL CUP (SOYBEAN OIL, WATER, BUTTERMILK, DISTILLED VINEGAR, SALT, EGG YOLK, SUGAR, WHEY PROTEIN CONCENTRATE, GARLIC JUICE, MONOSODIUM GLUTAMATE, XANTHAN GUM, NATURAL FLAVOR, ONION*, POTASSIUM SORBATE AND SODIUM BENZOATE ADDED AS PRESERVATIVES, POLYSORBATE 60, GARLIC*, SPICE, PHOSPHORIC ACID, LACTIC ACID, CALCIUM DISODIUM EDTA ADDED TO PROTECT FLAVOR. *DEHYDRATED), FRESH GRAPE TOMATO (GRAPE TOMATO)"
                        ],
                        "totalFatGram": 14.5,
                        "restrictions": "['vegan']",
                        "totalFatPercent": 22,
                        "totalCarbPercent": 3,
                        "addedSugarPercent": [
                            0
                        ],
                        "formalName": "Veggie Cup",
                        "addedSugarGram": [
                            0
                        ],
                        "proteinGram": 2.2,
                        "totalCarbGram": 9.3,
                        "kcalValue": 172.3,
                        "sellPrice": 3,
                        "sugarTotalPercent": "0",
                        "sugarTotalGram": 4.9,
                        "field1": 93,
                        "allergenList": " Dairy,  Eggs,  Soy",
                        "sodiumPercent": 12,
                        "caloriesFromFatValue": 130.5
                    }
                },
                {
                    "id": "lCvOZqQjq7MMOtTUPgyV",
                    "data": {
                        "sugarTotalPercent": "0",
                        "caloriesFromSaturatedFatValue": 55.8,
                        "proteinPercent": 85,
                        "allergenList": "Dairy",
                        "ingredList": [
                            "CHICKEN BREAST (BONELESS & SKINLESS) (CHICKEN. MAY CONTAIN UP TO 4% RETAINED WATER.), FRESH ROMAINE LETTUCE (LETTUCE), SHREDDED PARMESAN CHEESE (PARMESAN CHEESE (PASTEURIZED PART-SKIM COW'S MILK, CHEESE CULTURES, SALT, ENZYMES), POWDERED CELLULOSE ADDED TO PREVENT CAKING, NATAMYCIN ADDED TO MAINTAIN FRESHNESS.), GRAPE TOMATO (GRAPE TOMATO), GARLIC, MINCED, FRESH PARSLEY, KOSHER SALT (NON IODIZED KOSHER SALT), EV OLIVE OIL & CANOLA OIL 50/50 BLEND (50% CANOLA OIL. 50% EXTRA VIRGIN OLIVE OIL ), GROUND BLACK PEPPER (BLACK PEPPER)"
                        ],
                        "caloriesFromFatValue": 90,
                        "addedSugarPercent": [
                            0
                        ],
                        "sodiumMilligram": 638.9,
                        "restrictions": "['vegetarian', 'kosher', 'vegan']",
                        "totalCarbPercent": 2,
                        "upc": 70000111777,
                        "addedSugarGram": [
                            0
                        ],
                        "sellPrice": 6.75,
                        "totalCarbGram": 5.9,
                        "formalName": "Grilled Chicken Caesar Salad",
                        "totalFatGram": 10,
                        "totalFatPercent": 15,
                        "sugarTotalGram": 2.1,
                        "proteinGram": 42.7,
                        "sodiumPercent": 27,
                        "field1": 78,
                        "kcalValue": 313.7
                    }
                },
                {
                    "id": "P024TosHOYppPe5H6dFW",
                    "data": {
                        "totalFatGram": 26.1,
                        "kcalValue": 647.5,
                        "caloriesFromSaturatedFatValue": 49.5,
                        "proteinPercent": 58,
                        "sodiumPercent": 51,
                        "upc": 10192020002,
                        "totalFatPercent": 40,
                        "totalCarbGram": 79.5,
                        "addedSugarPercent": [
                            0
                        ],
                        "proteinGram": 28.9,
                        "addedSugarGram": [
                            0
                        ],
                        "caloriesFromFatValue": 234.9,
                        "sellPrice": 6.75,
                        "restrictions": "['vegetarian', 'vegan']",
                        "sugarTotalGram": 5.1,
                        "sodiumMilligram": 1227.2,
                        "formalName": "Chicken, Hummus, and Veg Wrap",
                        "allergenList": " Gluten,  Soy,  Wheat",
                        "totalCarbPercent": 27,
                        "field1": 175,
                        "ingredList": [
                            "CHICKEN SUB, TENDER MEATLESS VEGAN RANDO (Water, Enriched Wheat Flour (Wheat Flour, Niacin, Ferrous Sulfate, Thiamine Mononitrate, Riboflavin, Folic Acid). Soy Protein Isolate, Canola Oil, Vital Wheat Gluten, Rice Flour, Ancient Grain Flour (Khorasan Wheat, Amaranth, Millet, Quinoa), Methylcellulose, Oat Bran, Oats, Yeast Extract, Salt, Organic Yeast Extract, Sea Salt, Potato Starch, Organic Distilled Vinegar, Organic Cane Sugar, Sugar, Natural Flavors, Soybean Oil, Spices, Yeast, Color Added. Leavening (Sodium Bicarbonate, Cream Of Tartar). Onion Powder, Garlic Powder, Organic Soy Sauce Powder, Extractive Of Paprika (Color). Pea Protein, Turmeric Extractives), TORTILLA, FLOUR 12\" PRESSED SHELF STABL (ENRICHED UNBLEACHED FLOUR WHEAT FLOUR, NIACIN, REDUCED IRON, THIAMINE MONONITRATE, RIBOFLAVIN AND FOLIC ACID, WATER, VEGETABLE SHORTENING CONTAINS ONE OR MORE OF THE FOLLOWING: PALM OIL AND/OR CORN OIL, CONTAINS 2 OR LESS OF THE FOLLOWING: SALT, ALUMINUM-FREE LEAVENING SODIUM ACID PYROPHOSPHATE, SODIUM BICARBONATE, CORN STARCH, MONOCALCIUM PHOSPHATE, WHEAT PROTEIN, PRESERVATIVES CALCIUM PROPIONATE, SORBIC ACID, DOUGH CONDITIONER FUMARIC ACID, XANTHAN GUM, MONO- AND DIGLYCERIDES, SODIUM METABISULPHITE.), TOMATO, SLICED - DNO, CUCUMBER (CUCUMBER), PEPPER, RED ROASTED ITALIAN STYLE IMPORT (ROASTED PEPPERS, WATER, SALT AND CITRIC ACID), CHICK PEA BEAN, FRESH BABY SPINACH (SPINACH), 90/10 EV OLIVE CANOLA OIL BLEND (90% CANOLA OIL, 10% EXTRA VIRGIN OLIVE OIL. ), CHICK PEA BRINE, LEMON JUICE (Filtered water, lemon juice concentrate, sodium bisulfite (preservative), sodium benzoate (preservative) and lemon oil.), TAHINI SESAME PASTE (SESAME SEEDS), FRESH PEELED GARLIC (GARLIC), GROUND CUMIN (Cumin Seed), KOSHER SALT (SALT, SODIUM SILICOALUMINATE, DEXTROSE, POTASSIUM IODINE. )"
                        ],
                        "sugarTotalPercent": "0"
                    }
                }
            ]
        }))
    }

    useEffect(() => {
        if (user.location.latitude !== 0) {
            fetchMeals()
        }
    }, [user.location.latitude])

    useEffect(() => {
        setRegion(user.location)
    }, [user.location])
    console.log(meals.location.data)
    return (
        <View style={styles.centeredView}>
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
                            <View><Text style={{ fontFamily: 'Nunito-Bold', fontSize: 35 }}>{selectedItem.name}</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 25, marginLeft: 10 }}>{meals.location.data.name} - {Math.round(distance * 10) / 10} mi</Text>
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

                            {user.location.latitude == 0 ? <View></View> : <MapView style={{ height: 350, width: 350, borderRadius: 20, marginHorizontal: 10 }}
                                initialRegion={region}
                                scrollEnabled={true}
                                region={{ ...region, latitude: meals.location.data.coords.latitude, longitude: meals.location.data.coords.longitude }}>
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
                                    destination={{ latitude: meals.location.data.coords.latitude, longitude: meals.location.data.coords.longitude }}
                                    apikey={google_api_key}
                                />
                            </MapView>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 35, marginBottom: 10 }}>Nutrition</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 18, marginLeft: 20, alignItems: 'center' }}>Amount per serving</Text></View>
                            <View style={{ borderBottomWidth: 3, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 25, marginLeft: 10 }}>Calories</Text>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30 }}>{selectedItem.data.kcalValue}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Fat</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.totalFatGram}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Calories from fat</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.caloriesFromFatValue}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Calories from saturated fat</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.caloriesFromSaturatedFatValue}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Protein</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.proteinGram}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Protein % of daily allowance</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.proteinPercent}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Protein</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.proteinGram}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Protein % of daily allowance</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.proteinPercent}%</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Protein</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.proteinGram}g</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Protein % of daily allowance</Text>
                                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{selectedItem.data.proteinPercent}g</Text>
                            </View>
                        </ScrollView>
                    </View>

                </Modal> : null}
            {meals.length == 0 ? <TouchableOpacity onPress={fetchMeals}><Text>LOADING</Text></TouchableOpacity> : null}
            <FlatList data={meals.foods}
                style={{ width: "100%", paddingHorizontal: 10 }}
                keyExtractor={item => item.id}
                renderItem={(item) => {
                    console.log(item.item.data.kcalValue)
                    return <TouchableOpacity onPress={() => {
                        setSelectedItem(item.item)
                        setModalVisible(true);
                    }}><View
                        key={item.item.id} style={{
                            marginBottom: 20,
                            backgroundColor: '#e9e1c4',
                            width: "100%",
                            borderRadius: 20
                        }}>
                            <View style={{ flex: 1, borderRadius: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                <View style={{ justifyContent: 'space-evenly', height: "100%", flexDirection: 'column' }}>
                                    <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 20, color: '#111111' }}>{item.item.data.formalName}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <Ionicons name="ios-location" size={18} color="#333333" style={{ marginHorizontal: 8 }} />
                                        <Text style={{ fontFamily: 'Nunito-Light' }}>{meals.location.data.name} -  mi</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'Nunito-SemiBold' }}>{item.item.data.kcalValue}</Text>
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