import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './../screens/MainScreen';
import useSocket from '../socket/useSocket';
import SocketConnectionLost from './../screens/SocketConnectionLost';

const Stack = createStackNavigator();

function HomeNavigator(){

    const { connectSocket, socket } = useSocket();
    const [connected, setConnected] = useState(socket ? socket.connected : false);
    
    useEffect(() => {
        connectSocket(setConnected);
    }, []);

    const render = () => {
        if(connected) {
            return (
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                </Stack.Navigator>
            );
        } else {
            return <SocketConnectionLost />;
        }
    }

    return(
        render()
    );
}

export default HomeNavigator;