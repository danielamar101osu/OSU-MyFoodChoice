import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileInitials from '../../components/profile-initials';
import DinnerScreen from './dinner-screen';
import * as firebase from 'firebase'
import profileScreen from './profile-screen';
import ProfileScreen from './profile-screen';
import { useSelector, useDispatch } from 'react-redux';
import SnackScreen from './snack-screen';
import { setMeals } from '../../redux/actions/food-action';
import { get } from '../../services/networking/network';

const History = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const renderScene = SceneMap({
    first: DinnerScreen,
    second: SnackScreen,
    third: History,
});

export default function HomeScreen({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [userProfile, setUserProfile] = useState(false)
    const [routes] = React.useState([
        { key: 'first', title: 'Meal' },
        { key: 'second', title: 'Snack' },
        { key: 'third', title: 'History' },
    ]);
    async function fetchMeals() {
        let response = await get(`/foods/getFoodsForUser/:uid/${user.location.latitude}/${user.location.longitude}/0`, {})
        dispatch(setMeals(response))
    }

    useEffect(() => {
        console.log('updated')
        if (user.location.latitude !== 0) {
            console.log('fetching meals')
            fetchMeals()
        }
    }, [user.location.latitude,
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
    user.user.restrictions.porkFree]);

    const layout = useWindowDimensions();
    return (<View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 45 }}>OSU MyChef</Text>
                <ProfileInitials showProfile={() => setUserProfile(true)} size={55} />
            </View>
        </SafeAreaView>
        <TabView
            style={{ flex: 8, paddingTop: 0 }}
            renderTabBar={props => <TabBar {...props}
                indicatorStyle={{ height: 5 }}
                style={{ backgroundColor: 'white', margin: 0 }}
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
        {userProfile ? <ProfileScreen closeProfileScreen={() => { setUserProfile(false) }} navigation={navigation} /> : null}
    </View>
    );
}