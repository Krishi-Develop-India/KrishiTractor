import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AppText from '../components/AppText';
import Screen from './../components/Screen';
import colors from '../config/colors'
import ToggleSwitch from 'toggle-switch-react-native'
import LottieView from 'lottie-react-native';
import socket from '../api/socket';
import DetailRide from './../components/DetailRide';
import ServiceApi from '../api/service';
import * as LocationApi from 'expo-location';

function MainScreen(props) {

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [request, setRequest] = useState(null);
    
    const getSocketConnection = async () => {
        socket.setSocket();
    };

    const requestLocation = async () => {
        try {
            const { granted } = await LocationApi.requestPermissionsAsync();
            if(!granted) return;
        } catch(error) {
            console.log("Location permission", error);
        }
    };

    const onToggleSwitch = async () => {
        let currentSwitch = !isSwitchOn;
        setIsSwitchOn(!isSwitchOn);
        const locationResult = await LocationApi.getCurrentPositionAsync();
        const result = ServiceApi.switchTractor(locationResult.coords.latitude, locationResult.coords.longitude, currentSwitch);
    }

    useEffect(() => {
        requestLocation();
        getSocketConnection();
    }, []);

    return (
        <Screen style={styles.container}>
            <MapView
                initialRegion={{
                latitude: 26.881505,
                longitude: 80.993840,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
                }}
                style={styles.map}
            >
                <Marker
                    coordinate={{ latitude : 26.881505 , longitude : 80.993840 }}
                    title="Your location"
                    description="This is your location which will be seen to the tractor"
                />
            </MapView>
            <View style={styles.options}>
                <View style={styles.switchContainer}>
                    <AppText style={styles.switchText}>Ready to serve India</AppText>
                    <ToggleSwitch
                    isOn={isSwitchOn}
                    onColor={colors.orange}
                    size="medium"
                    onToggle={onToggleSwitch}
                    style={styles.switch}
                    />
                </View>
                <View style={styles.loading}>
                    {request ? 
                        <DetailRide />
                        :
                        <LottieView 
                        loop
                        autoPlay
                        style={styles.animation}
                        source={require('../assets/animations/searching.json')} 
                        resizeMode="cover"
                        speed={isSwitchOn ? 1 : 0} />
                    }
                </View>
            </View>
        </Screen>
    );
}


const styles = StyleSheet.create({
    animation: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    container: {
    },
    loading: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    map: {
        flex: 1,
    },
    options: {
        height: '35%',
        elevation: 2,
        borderTopColor: colors.shadow,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    switch: {
        marginLeft: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
    },
    switchText: {
        textAlign: 'center',
    },
})


export default MainScreen;