import React from 'react'
import { setNavigator } from './src/navigationRef';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { AuthProvider } from './src/context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import { LocationProvider } from './src/context/LocationContext';
import Entypo from '@expo/vector-icons/Entypo';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <Entypo name="list" size={20} color="white" />
}

const switchNavigator = createSwitchNavigator({
  splash: SplashScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialBottomTabNavigator({
    Account: AccountScreen,
    TrackCreate: TrackCreateScreen,
    trackListFlow
  })
}, {
  initialRouteName: 'splash'
})

const App = createAppContainer(switchNavigator)
export default () => {
  return <LocationProvider>
    <AuthProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </AuthProvider>
  </LocationProvider>
}