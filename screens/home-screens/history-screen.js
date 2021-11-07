import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import GraphSwitcher from '../../components/graph-switcher';
import TotalsHistory from '../../components/totals-history';

const NUTRIENTS = [
    'Calories',
    'Carbs',
    'Sugars',
    'Fats',
    'Protein',
    'Iron',
    'Sodium',
]


export default function HistoryScreen() {
    const [selectedNutrient, setSelectedNutrient] = useState('Calories');
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        }}>
            <ScrollView style={{ marginBottom: 20 }}>
                <Picker style={{ width: '100%', marginTop: -50, marginBottom: -50 }} selectedValue={selectedNutrient}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedNutrient(itemValue)
                    }>
                    {NUTRIENTS.map(nutrient => <Picker.Item key={nutrient} label={nutrient} value={nutrient} />)}
                </Picker>
                <GraphSwitcher selected={selectedNutrient} />
            </ScrollView>
        </View >
    );
}