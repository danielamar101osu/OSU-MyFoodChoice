import React, { } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default ProfileInitials = ({ showProfile, size, right, top }) => {
    const user = useSelector(state => state.user.user);
    return (
        <View style={{ borderRadius: 500, backgroundColor: 'rgba(200, 10,10,.5)', padding: 3, height: size, width: size, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <TouchableOpacity onPress={showProfile}>
                <Text style={{ fontSize: size / 1.8, fontFamily: 'Nunito-Bold' }}>{user.firstName.slice(0, 1).toUpperCase() + user.lastName.slice(0, 1).toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    );
};