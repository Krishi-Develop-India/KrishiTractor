import React, {useState} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './../screens/MainScreen';
import DrawerContent from './../components/DrawerContent';
import Profile from './../screens/Profile';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {

    const MainScreenDrawable = ({navigation}) => (
      <MainScreen navigation={navigation} />
    );
  
    const ServiceScreenDrawable = ({navigation}) => (
      <ServiceScreen navigation={navigation} />
    );
    
    return (
        <Drawer.Navigator initialRouteName="MainScreen" drawerPosition='right' drawerContent={props => <DrawerContent navigation={props.navigation} />}>
            <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;

