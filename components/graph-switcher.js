import React, { useEffect } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import TotalsHistory from './totals-history';
// import { google_api_key } from '../../config';
const data = [{ label: 'Protein', value: 34 + 'g' }, {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [20, 45, 28, 80, 90, 43],
        color: (opacity = 1) => `rgba(50  , 50, 50, ${opacity})`, // optional
        strokeWidth: 2 // optional
    }]
}]

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(255, 16, 13, ${opacity})`,
    strokeWidth: 2 // optional, default 3
}

const getWeekDays = function () {
    let nums = [0, 1, 2, 3, 4, 5, 6];
    const today = new Date().getDay()
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    for (let i = 0; i < 6 - today; i++) {
        nums.unshift(nums.pop());
    }

    return nums.map(el => today === el ? 'Today' : daysOfWeek[el]);
}

export default function GraphSwitcher({ selected }) {
    const orders = useSelector(state => state.food.orders)

    const { height, width } = useWindowDimensions();
    // let consumed = new Date(orders[0].timestamp)
    const getNutrientDataForWeek = function (selector) {
        const date = new Date()
        let labels = []
        let data = [0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < 7; i++) {
            labels.push(`${date.getMonth()}/${date.getDate()}`)
            date.setDate(date.getDate() - 1)

        }

        orders.forEach(element => {
            let elDate = new Date(element.timestamp)
            const ind = labels.indexOf(`${elDate.getMonth()}/${elDate.getDate()}`)
            if (ind > -1) {
                data[ind] += element.food[selector]
            }
        });

        return {
            labels: labels,
            datasets: [{
                data: data.map(total => Math.round(total)),
                color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }]
        }
    }

    switch (selected) {
        case 'Calories':
            const calorieWeek = getNutrientDataForWeek('kcalValue')
            return <TotalsHistory data={[
                { label: selected, value: calorieWeek.datasets[0].data[0] + '' },
                calorieWeek
            ]} chartConfig={chartConfig} />
        case 'Protein':
            const proteinWeek = getNutrientDataForWeek('proteinGram')
            return <TotalsHistory data={[
                { label: selected, value: proteinWeek.datasets[0].data[0] + 'g' },
                proteinWeek
            ]} chartConfig={chartConfig} />
        case 'Iron':
            const ironWeek = getNutrientDataForWeek('ironMill')
            return <TotalsHistory data={[
                { label: selected, value: ironWeek.datasets[0].data[0] + 'mg' },
                ironWeek
            ]} chartConfig={chartConfig} />
        case 'Sodium':
            const sodiumWeek = getNutrientDataForWeek('sodiumMilligram')
            return <TotalsHistory data={[
                { label: selected, value: sodiumWeek.datasets[0].data[0] + 'mg' },
                sodiumWeek
            ]} chartConfig={chartConfig} />
        default:
            return <TotalsHistory data={data} chartConfig={chartConfig} />
    }
}
