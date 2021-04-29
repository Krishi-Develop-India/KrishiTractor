import React, {useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native';

import Screen from './../components/Screen';
import AppText from './../components/AppText';
import colors from '../config/colors';
import useRide from './../ride/useRide';

function RideConfirmScreen({props, route, navigation}) {

    const { _id } = route.params;

    console.log(_id);

    const { socket } = useSocket();

    const { storeTheRide } = useRide();

    socket.on('ride-confirmed', async data => {
        console.log("In ride-confirmed socket call");
        if(data._id == -1) {
            console.log("The data._id of the ride-confirmed is -1");
            return navigation.goBack();
        }
        console.log(data._id, typeof(data._id));
        await storeTheRide(data._id);
        console.log(`Ride confirm socket and ride is ${data._id}`);
    });

    useEffect(() => {
        console.log(route);
        socket.emit('confirm-ride', {_id: _id});
    });

    return (
        <Screen style={styles.container}>
            <LottieView style={styles.animation}
                autoPlay
                source={require('../assets/animations/loading.json')} 
                loop={true}
            />
            <AppText style={styles.slogon}>Confirming your user</AppText>
        </Screen>
    );
}


const styles = StyleSheet.create({
    animation: {
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slogon: {

    },
})


export default RideConfirmScreen;