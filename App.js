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

const switchNavigator = createSwitchNavigator({
  splash: SplashScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialBottomTabNavigator({
    Account: AccountScreen,
    TrackCreate: TrackCreateScreen,
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen,
    }),
  })
}, {
  initialRouteName: 'splash'
})

const App = createAppContainer(switchNavigator)
export default () => {
  return <AuthProvider>
    <App ref={(navigator) => setNavigator(navigator)} />
  </AuthProvider>
}