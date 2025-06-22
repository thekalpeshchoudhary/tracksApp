import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function TrackListScreen({navigation}) {
  return (
    <View>
        <Text>TrackListScreen</Text>
        <Button title='Go to Track Detail' onPress={()=>{
            navigation.navigate('TrackDetail')
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
    
})