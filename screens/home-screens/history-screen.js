import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
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
];

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(255, 16, 13, ${opacity})`,
    strokeWidth: 2 // optional, default 3
};


export default function HistoryScreen() {
    const [selectedNutrient, setSelectedNutrient] = useState('Calories');
    const orders = useSelector(state => state.food.orders);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        }}>
            < Swiper showsButtons={true}
                loadMinimalSize={4}
                dotColor={'rgba(200, 10,10,.2)'}
                activeDotColor={'rgba(200, 10,10,.5)'}
                paginationStyle={{ flex: 1, top: 10, bottom: null }}
                style={{
                    justifyContent: 'center', alignItems: 'center',
                }
                }
                buttonWrapperStyle={{
                    alignItems: 'flex-start',
                    paddingBottom: 50,
                }}
                nextButton={<Text style={{ color: 'rgba(200, 10,10,.9)', fontSize: 90 }}>›</Text>}
                prevButton={<Text style={{ color: 'rgba(200, 10,10,.9)', fontSize: 90 }}>‹</Text>}>
                {Object.keys(orders).map((el, ind) => {
                    const title = NUTRIENTS.find(nut => el.toLowerCase().includes(nut.toLowerCase()));
                    return <ScrollView key={title}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text key='tot' style={{ fontSize: 50, fontFamily: 'Nunito-SemiBold', width: '100%', textAlign: 'center', borderBottomColor: 'black', marginTop: 20 }}>{title}</Text>
                            <TotalsHistory key="data" data={[
                                { label: title, value: orders[el].day + 'g' },
                                {
                                    labels: orders[el].week.labels,
                                    datasets: orders[el].week.datasets.map((dataset) => {
                                        return {
                                            data: dataset,
                                            color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                                            strokeWidth: 2 // optional
                                        };
                                    })
                                },
                                {
                                    labels: orders[el].month.labels,
                                    datasets: orders[el].month.datasets.map((dataset) => {
                                        return {
                                            data: dataset,
                                            color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                                            strokeWidth: 2 // optional
                                        };
                                    })
                                },
                                {
                                    labels: orders[el].ytd.labels,
                                    datasets: orders[el].ytd.datasets.map((dataset) => {
                                        return {
                                            data: dataset,
                                            color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                                            strokeWidth: 2 // optional
                                        };
                                    })
                                }
                            ]} chartConfig={chartConfig} />
                        </View>
                    </ScrollView>;
                })}
            </Swiper >
        </View >
    );
}