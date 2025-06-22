import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default function SplashScreen() {
    return <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:10
    }}>
        <MaterialCommunityIcons name="go-kart-track" size={100} color="skyblue" />
        <Text h3>Namaste!</Text>
    </View>;
}
