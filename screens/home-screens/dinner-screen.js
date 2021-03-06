import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import FoodInfoModal from '../../components/food-info-modal';
import FoodListItem from '../../components/food-list-item';

/**
 *  Subscreen displayed below home screen when dinner tab is selected.
 */
export default function DinnerScreen() {
  //Gets local meal state
  const meals = useSelector((state) => state.food.meals);

  //Modal variables
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {meals.length == 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={meals.foods.filter((el) => el.kcalValue > 300)}
          style={{ width: '100%', paddingHorizontal: 10 }}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return <FoodListItem setModalVisible={setModalVisible} setSelectedItem={setSelectedItem} item={item} />;
          }}
        ></FlatList>
      )}
      <FoodInfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} selectedItem={selectedItem} locationData={meals.location?.id} />
    </View>
  );
}
