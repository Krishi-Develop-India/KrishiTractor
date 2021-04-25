import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './app/navigation/AuthNavigation';
import SplashScreen from './app/screens/SplashScreen';
import authStorage from './app/auth/storage';
import authSocket from './app/socket/storage';
import AuthContext from './app/auth/context';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import MainScreen from './app/screens/MainScreen';
import SocketContext from './app/socket/context';

export default function App() {

  const restoreSession = async () => {
    const token = await authStorage.getToken();
    setUser(token);
  };

  const restoreSocket = async () => {
    const socket = await authSocket.getSocket();
    setSocket(socket);
  };

  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    loadFont();
    restoreSession();
    restoreSocket();
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
        <NavigationContainer>
          {user ? <DrawerNavigation /> : <AuthNavigation />}
        </NavigationContainer>
        </SocketContext.Provider>
      </AuthContext.Provider>
      }
    </Root>
  );
}