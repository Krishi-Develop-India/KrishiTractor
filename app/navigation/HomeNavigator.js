import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './../screens/MainScreen';

const Stack = createStackNavigator();

function HomeNavigator(){
    return(
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
    );
}

export default HomeNavigator;