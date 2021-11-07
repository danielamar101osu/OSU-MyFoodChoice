import React, { } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function TotalsHistory({ data, chartConfig }) {
    const { height, width } = useWindowDimensions();

    return (<View>
        <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginBottom: 10 }}>Today</Text>
            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginBottom: 10, marginLeft: 20 }}>Total {data[0].label} - {data[0].value}</Text>

        </View>
        <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 30, marginBottom: 10 }}>This Week</Text>
            <LineChart
                style={{ borderRadius: 10 }}
                bezier
                data={data[1]}
                width={width - 20}
                height={220}
                chartConfig={chartConfig}
            />
        </View>

    </View>
    );
}
