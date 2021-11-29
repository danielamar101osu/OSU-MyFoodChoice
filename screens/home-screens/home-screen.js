import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, SafeAreaView, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileInitials from '../../components/profile-initials';
import DinnerScreen from './dinner-screen';
import ProfileScreen from './profile-screen';
import { useSelector, useDispatch } from 'react-redux';
import SnackScreen from './snack-screen';
import { nextLocation, previousLocation, setAllMeals, setMeals, setOrderHistory } from '../../redux/actions/food-action';
import { get } from '../../services/networking/network';
import HistoryScreen from './history-screen';
import ORDER_HISTORY_DUMMY from '../../assets/static/orders';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const renderScene = SceneMap({
  first: DinnerScreen,
  second: SnackScreen,
  third: HistoryScreen,
});

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const locationName = useSelector((state) => {
    if (state.food.meals == null || state.food.meals.location == null) {
      return 'loading...';
    } else {
      return state.food.meals.location.name;
    }
  });
  const [userProfile, setUserProfile] = useState(false);
  const [routes] = useState([
    { key: 'first', title: 'Meal' },
    { key: 'second', title: 'Snack' },
    { key: 'third', title: 'History' },
  ]);

  async function fetchMeals() {
    let response = await get(`/foods/functions/getFoodsForUser/:uid/${user.location.latitude}/${user.location.longitude}/10`, {});
    dispatch(setAllMeals(response));
  }

  useEffect(() => {
    if (user.location.latitude !== 0) {
      console.log('fetching meals');
      fetchMeals();
    }
  }, [
    user.location.latitude,
    user.user.allergies.treeNuts,
    user.user.allergies.dairy,
    user.user.allergies.eggs,
    user.user.allergies.peanuts,
    user.user.allergies.shellFish,
    user.user.allergies.soy,
    user.user.allergies.wheat,
    user.user.restrictions.beefFree,
    user.user.restrictions.kosher,
    user.user.restrictions.pescatarian,
    user.user.restrictions.vegetarian,
    user.user.restrictions.vegan,
    user.user.restrictions.porkFree,
  ]);

  async function fetchOrderHistory() {
      let response = await get(`/users/functions/aggregateOrderData/:uid`, {});
    dispatch(setOrderHistory(response));
  }
  useEffect(() => {
    console.log('fetching');
    fetchOrderHistory();
  }, []);
  const layout = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
          <View>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 45 }}>OSU MyChef</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => dispatch(previousLocation())}>
                <Text style={{ color: 'rgba(200, 10,10,.9)', fontSize: 40, padding: 10 }}>‹</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Nunito-Light', fontSize: 25, marginTop: 7 }}>{locationName}</Text>
              <TouchableOpacity onPress={() => dispatch(nextLocation())}>
                <Text style={{ color: 'rgba(200, 10,10,.9)', fontSize: 40, padding: 10 }}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ProfileInitials
            showProfile={() => {
              console.log('pressed');
              setUserProfile(true);
            }}
            size={55}
          />
        </View>
      </SafeAreaView>
      <TabView
        style={{ flex: 5, paddingTop: 0 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ height: '80%', backgroundColor: 'rgba(200, 10,10,.5)', borderRadius: 10, width: '33%', marginBottom: '1%' }}
            style={{ backgroundColor: 'white', marginHorizontal: 5, padding: 0 }}
            renderLabel={({ route, focused, color }) => (
              <View style={{ flex: 1, margin: 0, width: 100, alignItems: 'center' }}>
                <Text style={{ color: '#333333', fontFamily: focused ? 'Nunito-Bold' : 'Nunito-Light', fontSize: 20 }}>{route.title}</Text>
              </View>
            )}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: 400 }}
      />
      {userProfile ? (
        <ProfileScreen
          closeProfileScreen={() => {
            setUserProfile(false);
          }}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
}
