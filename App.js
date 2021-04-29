import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './app/navigation/AuthNavigation';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';
import rideStorage from './app/ride/storage';
import AuthContext from './app/auth/context';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import MainScreen from './app/screens/MainScreen';
import SocketContext from './app/socket/context';
import RideContext from './app/ride/context';
import ActiveScreen from './app/screens/ActiveScreen';
import RideConfirmScreen from './app/screens/RideConfirmScreen';
import RideAcceptedNavigator from './app/navigation/RideAcceptedNavigator';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  };

  const restoreRide = async () => {
    const ride = await rideStorage.getRide();
    setRide(ride);
  };

  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    loadFont();
    restoreSession();
    restoreRide();
  }, [user]);

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  };

  return (
    <Root>
      {
        firstLoad 
        ? 
        <SplashScreen setFirstLoad={setFirstLoad} /> 
        : 
        <AuthContext.Provider value={{user, setUser}}>
          <SocketContext.Provider value={{socket, setSocket}}>
            <RideContext.Provider value={{ride, setRide}}>
              <NavigationContainer>
                {user ? (ride ?  <RideAcceptedNavigator /> : <DrawerNavigation />) : <AuthNavigation />}
              </NavigationContainer>
            </RideContext.Provider>
          </SocketContext.Provider>
      </AuthContext.Provider>
      }
    </Root>
  );
}