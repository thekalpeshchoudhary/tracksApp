import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import MapView, { Polyline } from 'react-native-maps'
import { useLocation } from '../context/LocationContext'

export default function Map() {
  const { currentLocation, locations } = useLocation()
  const coordinates = locations.map(l => l.coords)
  return (
    <View>
      <MapView
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: currentLocation?.coords?.latitude ?? 18.997681,
          longitude: currentLocation?.coords?.longitude ?? 72.8413814,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        region={{
          latitude: currentLocation?.coords?.latitude ?? 18.997681,
          longitude: currentLocation?.coords?.longitude ?? 72.8413814,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        style={styles.mapStyles} >
        <Polyline coordinates={coordinates} />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    marginVertical: 10,
  },
  mapStyles: {
    height: 400,
  }
})