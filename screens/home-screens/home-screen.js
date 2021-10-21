import React, { useState } from 'react';
import { View, useWindowDimensions, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileInitials from '../../components/profile-initials';
import DinnerScreen from './dinner-screen';
import * as firebase from 'firebase'
import profileScreen from './profile-screen';
import ProfileScreen from './profile-screen';
import { useSelector } from 'react-redux';
const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const History = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const renderScene = SceneMap({
    first: DinnerScreen,
    second: SecondRoute,
    third: FirstRoute,
    fourth: History,
});

export default function HomeScreen({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const user = useSelector(state => state.user)
    const [userProfile, setUserProfile] = useState(false)
    const [routes] = React.useState([
        { key: 'first', title: 'Meal' },
        { key: 'second', title: 'Snack' },
        { key: 'third', title: 'Other' },
        { key: 'fourth', title: 'History' },
    ]);
    const layout = useWindowDimensions();
    return (<View style={{ flex: 1 }}>
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
        {userProfile ? <ProfileScreen closeProfileScreen={() => { setUserProfile(false) }} navigation={navigation} /> : null}
    </View>
    );
}