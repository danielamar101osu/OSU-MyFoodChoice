import React, { } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

/**
 * @param {*} data
 *      Food history data
 * @returns 
 *      Returns a view of three graphs: this week, this month, and YTD to be displayed when a nutrition
 *      property is clicked   
 */
export default function TotalsHistory({ data, chartConfig }) {
    const { height, width } = useWindowDimensions();
    return (<View style={{}}>
        <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginBottom: 10 }}>Today</Text>
            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginBottom: 10, marginLeft: 20 }}>Total {data[0].label} - {data[0].value}</Text>

        </View>
         <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginBottom: 10 }}>This Week</Text>
            <LineChart
                style={{ borderRadius: 10 }}
                bezier
                data={data[1]}
                width={width - 40}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
       <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginBottom: 10 }}>This Month</Text>
            <LineChart
                style={{ borderRadius: 10 }}
                bezier
                data={data[2]}
                width={width - 40}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginBottom: 10 }}>YTD</Text>
            <LineChart
                style={{ borderRadius: 10, marginBottom: 50 }}
                bezier
                data={data[3]}
                width={width - 40}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    </View>
    );
}
