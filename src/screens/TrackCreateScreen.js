import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Map from '../components/Map'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import { Button, Input, Text } from 'react-native-elements'
import { Accuracy, requestBackgroundPermissionsAsync, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'
// import '../_mockLocation';
import { useLocation } from '../context/LocationContext'
import Spacer from '../components/Spacer'

function TrackCreateScreen({ isFocused }) {
  const [err, setErr] = useState(false);
  const [subscriber, setSubscriber] = useState(null);
  const { name, setName, recording, setRecording, setCurrentLocation } = useLocation()

  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      await requestBackgroundPermissionsAsync();
      const subscriber = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, location => {
        location && setCurrentLocation(location)
      });
      setSubscriber(subscriber)
      if (!granted) {
        throw new Error('Location permission not granted');
      }
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    if (isFocused) startWatching()
    if (!isFocused && !recording) {
      subscriber?.remove()
      setSubscriber(null)
    }
  }, [isFocused])

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <View style={{
        ...styles.mapView,
        ...recording ? styles.mapRecordingView : styles.mapRecordingStoppedView
      }}>
        <Map />
      </View>
      <Spacer />
      <Input disabled={recording} autoCapitalize='none' autoCorrect={false} onChangeText={setName} label="Track Name" value={name} />

      {err ? <Text h4>Please allow location permission</Text> : null}

      <Button
        disabled={err || !name}
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={() => setRecording(!recording)} />
    </SafeAreaView>
  )
}

export default withNavigationFocus(TrackCreateScreen);

const styles = StyleSheet.create({
  mapView: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  mapRecordingView: {
    borderColor: '#00AA00'
  },
  mapRecordingStoppedView: {
    borderColor: '#AAAAA0'
  }
})