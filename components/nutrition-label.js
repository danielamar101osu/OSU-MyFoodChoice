import React, { } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { google_api_key } from '../../config';

export default function NutritionLabel({ data }) {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 35, marginBottom: 10 }}>Nutrition</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 18, marginLeft: 20, alignItems: 'center' }}>Amount per serving</Text></View>
            <View style={{ borderBottomWidth: 3, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 25, marginLeft: 10 }}>Calories</Text>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30 }}>{data.kcalValue}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Carbs</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.totalCarbGram}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Sugars</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.sugarTotalGram}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Added Sugars</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.addedSugarGram}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Fat</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.totalFatGram}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Calories from fat</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.caloriesFromFatValue}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>Calories from saturated fat</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.caloriesFromSaturatedFatValue}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Protein</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.proteinGram}g</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>% of daily allowance</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.proteinPercent}%</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Total Iron</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.ironMill}mg</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>% of daily allowance</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.ironPercent}%</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 20, marginLeft: 10 }}>Sodium</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.sodiumMilligram}mg</Text>
            </View>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginLeft: 25 }}>% of daily allowance</Text>
                <Text style={{ fontFamily: 'Nunito-Light', fontSize: 20, marginLeft: 20 }}>{data.sodiumPercent}%</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginVertical: 5, }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 25, marginLeft: 10 }}>Ingredients</Text>
                {data.ingredList.map(el => <Text key={el} style={{ fontFamily: 'Nunito-Light', fontSize: 18, marginLeft: 10 }}>{el}</Text>)}
            </View>
        </View >
    );
}
