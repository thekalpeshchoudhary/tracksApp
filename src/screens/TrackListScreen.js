import React from 'react'
import { Button, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useLocation } from '../context/LocationContext'

export default function TrackListScreen({ navigation }) {
  const { tracks } = useLocation()

  return (
    <View>
      <FlatList
        data={tracks}
        renderItem={({ item }) => {
          return <TouchableOpacity
            onPress={() => {
              navigation.navigate('TrackDetail',{id:item._id})
            }} >
            <View style={{
              backgroundColor: '#ddd',
              padding: 20,
              borderRadius: 5,
              marginBottom: 10,
            }}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})