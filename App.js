import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './app/navigation/AuthNavigation';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';
import AuthContext from './app/auth/context';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import MainScreen from './app/screens/MainScreen';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  }

  const [user, setUser] = useState();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    loadFont();
    restoreSession();
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
        <NavigationContainer>
          {user ? <DrawerNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </AuthContext.Provider>
      }
    </Root>
  );
}