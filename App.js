import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, SafeAreaView, Text, Modal, TouchableOpacity, Switch } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DinnerScreen from './dinner-screen';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import userReducer from './redux/reducers/user-reducer';
import { LoadingScreen } from './loading-modal';
import { BlurView } from 'expo-blur';
import meals from './assets/static/meals';
import foodReducer from './redux/reducers/food-reducer';
import ProfileInitials from './profile-initials';
import ProfileScreen from './profile-screen';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: DinnerScreen,
  second: SecondRoute,
  third: FirstRoute
});

const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer
})
const store = createStore(rootReducer);

export default function App() {
  const [userProfile, setUserProfile] = useState(false)
  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
  });


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Meal' },
    { key: 'second', title: 'Snack' },
    { key: 'third', title: 'Other' },
  ]);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 15, paddingTop: 10 }}>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 35 }}>OSU MyChef</Text>
          </View>
          <View style={{ position: 'absolute', right: 20, top: 50 }}>
            <ProfileInitials showProfile={() => setUserProfile(true)} size={55} />
          </View>
        </SafeAreaView>
        <TabView
          style={{ flex: 13, paddingTop: 0 }}
          renderTabBar={props => <TabBar {...props}
            indicatorStyle={{ height: 5 }}
            style={{ backgroundColor: '#fefdfc', margin: 0 }}
            renderLabel={({ route, color }) => (
              <View style={{ flex: 1, justifyContent: 'flex-end', margin: 0 }}>
                <Text style={{ color: '#333333', fontFamily: 'Nunito-Light', fontSize: 20 }}>
                  {route.title}
                </Text>
              </View>
            )} />}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width, height: 400 }}
        />
        <LoadingScreen />
        {userProfile ? <ProfileScreen closeProfileScreen={() => { setUserProfile(false) }} /> : null}
      </Provider>
    );
  }
}