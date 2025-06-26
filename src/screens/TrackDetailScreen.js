import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useLocation } from '../context/LocationContext';
import { Text } from 'react-native-elements';
import MapView, { Circle, Polyline } from 'react-native-maps';

export default function TrackDetailScreen({ navigation }) {
  const { tracks } = useLocation()
  const id = navigation.getParam('id');
  const track = tracks.find(t => t._id === id)
  const coordinates = track.locations.map(l => l.coords)

  return (
    <View>
      <Text h2>{track.name} </Text>
      <View>
        <MapView
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          initialRegion={{
            latitude: track?.locations[0]?.coords?.latitude ?? 18.997681,
            longitude: track?.locations[0]?.coords?.longitude ?? 72.8413814,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          region={{
            latitude: track?.locations[0]?.coords?.latitude ?? 18.997681,
            longitude: track?.locations[0]?.coords?.longitude ?? 72.8413814,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          style={styles.mapStyles} >
          <Polyline coordinates={coordinates} />
          <Circle
            center={{
              latitude: track?.locations[0]?.coords?.latitude ?? 18.997681,
              longitude: track?.locations[0]?.coords?.longitude ?? 72.8413814,
            }}
            radius={20}
            fillColor='rgba(0,100,0, 1.0)' stroke="rgba(158,158,158, 1.0)" />
          {track?.locations.length > 2 ?
            <Circle
              center={{
                latitude: track?.locations[track?.locations.length - 1]?.coords?.latitude ?? 18.997681,
                longitude: track?.locations[track?.locations.length - 1]?.coords?.longitude ?? 72.8413814,
              }}
              radius={20} fillColor='rgba(40,10,40, 1.0)' stroke="rgba(158,158,158, 1.0)" /> :
            null}
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapStyles: {
    height: '100%',
  }
})
