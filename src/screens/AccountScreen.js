import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useAuth } from '../context/AuthContext'
import { SafeAreaView } from 'react-navigation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AccountScreen() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View>
        <Text>AccountScreen</Text>
        <Button title='Sign Out' onPress={signOut} />
      </View>
    </SafeAreaView>
  )
}

AccountScreen.navigationOptions = () => {
  return {
    title: "Account",
    tabBarIcon: <MaterialIcons name="manage-accounts" size={20} color="white" />
  };
};


const styles = StyleSheet.create({

})