import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from "expo-linking";

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from './../components/Screen';
import useRide from './../ride/useRide';
import useNotification from '../hooks/useNotification';

function ActiveService(props) {

    const { socket } = useSocket();

    const { ride, removeTheRide } = useRide();

    const { showNotification } = useNotification();

    const [ userDetails, setUserDetails ] = useState(
        {
            name: 'Loading', 
            rating: 'loading', 
            tractor_number: 'loading'
        }
    );

    const [work, setWork] = useState(null);

    socket.on('user-details', data => {
        if(data._id == -1) return removeTheRide();
        setUserDetails(data);
        console.log(data);
        showNotification('Your ride has been confiemd', `${data.name} is your make India better milestone`);
    });

    socket.on('request-cancelled-by-user', data => {
        if(data._id == ride) removeTheRide();
        showNotification('Sorry', `${data.name} cancelled the service`);
    });

    useEffect(() => {
        socket.emit('get-user-details', {_id: ride});
    }, []);

    const handleCallTractor = () => {
        Linking.openURL(`tel:${userDetails.number}`);
        console.log("Handling the on call tractor");
    };

    const handleCancelTractor = async () => {
        socket.emit('request-cancelled-after-confirm', {_id: ride});
        await removeTheRide();
    };

    const handleStartWork = async () => {
        socket.emit('work-started', {_id: ride});
        setWork(ride);
    };

    const handleWorkFinish = async () => {
        socket.emit('work-finished', {_id: ride});
        showNotification('Service Finished', `Your make India better for ${userDetails.name} is completed`);
        removeTheRide();
    };

    return (
        <Screen style={styles.container}>
            <MapView
                region={
                    {latitude: 26.872117,
                    longitude: 80.982301,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,}
                }
                style={styles.map}
                showsUserLocation
                followsUserLocation
            >
                <Marker
                    coordinate={{ latitude : 26.872117, longitude : 80.982301 }}
                    title="Your location"
                    description="This is your location which will be seen to the tractor"
                />
            </MapView>
            <View style={styles.guide_info_container}>
                <View style={styles.guide_profile}>
                    <View style={styles.guide_image_container}>
                        <Image source={userDetails.image ? {uri: userDetails.image} : require('../assets/profile.png')} style={styles.guide_image} />
                    </View>
                    <View style={styles.guide_details_container}>
                        <AppText style={styles.guide_name}>{userDetails.name}</AppText>
                        <AppText style={styles.guide_vehicle}>Rating: {userDetails.rating}</AppText>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, styles.callTractor]} activeOpacity={0.6} onPress={handleCallTractor} disabled={userDetails.number ?  false :  true}>
                    <AppText style={styles.buttonText}>Call User</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.callTractor]} activeOpacity={0.6} onPress={work ? handleWorkFinish : handleStartWork} disabled={userDetails.number ?  false :  true}>
                    <AppText style={styles.buttonText}>{work ? 'Finish Service' : 'Start Working'}</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelTractor]} activeOpacity={0.2} onPress={handleCancelTractor}>
                    <AppText style={[styles.buttonText, styles.buttonText_black]}>Cancel Service</AppText>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}


const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderWidth: 2,
    },
    buttonText: {
        color: colors.light, 
    },
    buttonText_black: {
        color: colors.black,
    },
    container: {
    },
    cancelTractor: {
        borderColor: colors.black,
    },
    callTractor: {
        backgroundColor: colors.black,
    },
    guide_info_container: {
        minHeight: 250,
    },
    guide_details_container: {
        justifyContent: 'center',
    },
    guide_image: {
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderColor: colors.light,
        borderWidth: 2,
        padding: 10,
        height: 60,
        width: 60,
    },
    guide_name: {
        fontSize: 22,
    },
    guide_profile: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    map: {
        flex: 1,
    }
});


export default ActiveService;