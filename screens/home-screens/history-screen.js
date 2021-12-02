import React, { useState, useEffect } from 'react';
import { Modal, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import TotalsHistory from '../../components/totals-history';
import { Ionicons } from '@expo/vector-icons';

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(255, 16, 13, ${opacity})`,
  strokeWidth: 2, // optional, default 3
};

/**
 * This method is in charge of creating the history screen view.
 */
export default function HistoryScreen() {
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const orders = useSelector((state) => state.food.orders);
  useEffect(() => {
  }, [selectedNutrient]);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Modal visible={selectedNutrient !== null} style={{ flex: 1 }}>
        <View style={{ alignItems: 'flex-end', paddingTop: 40 }}>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              setSelectedNutrient(null);
            }}
          >
            <Ionicons name="ios-close" size={40} color="black" />
          </TouchableOpacity>
        </View>
        {selectedNutrient !== null ? (
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Text
                key="tot"
                style={{ fontSize: 50, fontFamily: 'Nunito-SemiBold', width: '100%', textAlign: 'center', borderBottomColor: 'black', marginTop: 20 }}
              >
                {selectedNutrient
                  .replace(selectedNutrient.charAt(0), selectedNutrient.charAt(0).toUpperCase())
                  .split(/(?=[A-Z])/)
                  .join(' ')}
              </Text>
              <TotalsHistory
                key="data"
                data={[
                  { label: orders[selectedNutrient].today.labels[0], value: Math.round(orders[selectedNutrient].today.datasets[0]*10)/10 + 'g' },
                  {
                    labels: orders[selectedNutrient].week.labels.map((label) => label.split(' ')[1]),
                    datasets: [
                      {
                        data: orders[selectedNutrient].week.datasets,
                        color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                        strokeWidth: 2, // optional
                      },
                    ],
                  },
                  {
                    labels: orders[selectedNutrient].month.labels.map((label, ind) => (ind % 3 === 0 ? label : '')),
                    datasets: [
                      {
                        data: orders[selectedNutrient].month.datasets,
                        color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                        strokeWidth: 2, // optional
                      },
                    ],
                  },
                  {
                    labels: orders[selectedNutrient].year.labels.map((label) => label.substring(0, 3)),
                    datasets: [
                      {
                        data: orders[selectedNutrient].year.datasets,
                        color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
                        strokeWidth: 2, // optional
                      },
                    ],
                  },
                ]}
                chartConfig={chartConfig}
              />
            </View>
          </ScrollView>
        ) : null}
      </Modal>
      <ScrollView>
        {Object.keys(orders)
          .filter((key) => !key.includes('ercent'))
          .map((el, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  setSelectedNutrient(el);
                }}
                style={{ margin: 10, padding: 10, borderColor: 'red', borderWidth: 1, borderRadius: 10, paddingVertical: 20 }}
              >
                <Text style={{ fontSize: 20, fontFamily: 'Nunito-Light' }}>
                  {el
                    .replace(el.charAt(0), el.charAt(0).toUpperCase())
                    .split(/(?=[A-Z])/)
                    .join(' ')}
                </Text>
              </TouchableOpacity>
            );
          })}
        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>
    </View>
  );
}
