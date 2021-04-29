import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AppText from '../components/AppText';
import Screen from './../components/Screen';
import colors from '../config/colors'
import ToggleSwitch from 'toggle-switch-react-native'
import LottieView from 'lottie-react-native';
import DetailRide from './../components/DetailRide';
import ServiceApi from '../api/service';
import * as LocationApi from 'expo-location';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Notifications from "expo-notifications";
import * as Permissions from 'expo-permissions';
import useNotification from '../hooks/useNotification';

function MainScreen({navigation}) {

    const [isSwitchOn, setIsSwitchOn] = useState(null);
    const [request, setRequest] = useState(null);
    const { socket } = useSocket();
    const [location, setLocation] = useState();

    const { showNotification } = useNotification();

    //80.982301
    //26.872117


    socket.on('request', data => {
        setRequest(data);
    });

    const requestNotification = async () => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if(status == 'granted') {
            console.log('Permission granted');
        } else {
            console.log('Permission Denied');
        }
    };

    const requestLocation = async () => {
        try {
            const { granted } = await LocationApi.requestPermissionsAsync();
            if(!granted) return;
            let newLocation = await (await LocationApi.getCurrentPositionAsync({})).coords;
            setLocation(newLocation);
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

    const getTheSwitch = () => {
        socket.emit('getSwitchInfo');
        socket.on('switchInfo', data => {
            setIsSwitchOn(data.switch);
        });
    };

    useEffect(() => {
        requestLocation();
        requestNotification();
        getTheSwitch();
    }, []);

    const loadMap = ()=> {
        if(request) {
            return (
                <MapView
                    region={
                        {latitude: request.latitude,
                        longitude: request.longitude,
                        latitudeDelta: 0.006,
                        longitudeDelta: 0.006,}
                    }
                    style={styles.map}
                    showsUserLocation
                    followsUserLocation
                >
                    {
                        !request 
                        ?
                        null
                        :
                        <Marker
                            coordinate={{ latitude : request.latitude , longitude : request.longitude }}
                            title="Your location"
                            description="This is your location which will be seen to the tractor"
                        />
                    }
                </MapView>
            );
        }
        else if(location) {
            return(
            <MapView
                region={
                    {latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,}
                }
                style={styles.map}
                showsUserLocation
                followsUserLocation
            >
                {
                    !request 
                    ?
                    null
                    :
                    <Marker
                        coordinate={{ latitude : request.latitude , longitude : request.longitude }}
                        title="Your location"
                        description="This is your location which will be seen to the tractor"
                    />
                }
            </MapView>);
        } else {
            return (

                <MapView
                region={
                    {latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.005,
                    longitudeDelta: 0.005,}
                }
                style={styles.map}
                showsUserLocation
                followsUserLocation
                >
                {
                    !request 
                    ?
                    null
                    :
                    <Marker
                    coordinate={{ latitude : request.latitude , longitude : request.longitude }}
                    title="Your location"
                    description="This is your location which will be seen to the tractor"
                    />
                }
            </MapView>
            );
        }
    };

    const cancelRide = () => {
        console.log("Ride cancelled");
        setRequest(null);
        socket.emit('cancel-request', {_id: request._id});
    };

    const acceptRide = () => {
        console.log("Ride accepted");
        socket.emit('accept-request', {_id: request._id});
        navigation.navigate('RideConfirmScreen', {_id: request._id});
    };

    return (
        <Screen style={styles.container}>
            <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={() => navigation.toggleDrawer()}>
                <MaterialCommunityIcons name="account" size={30} color={colors.white} />
            </TouchableOpacity>
            {loadMap()}
            <View style={styles.options}>
                <View style={styles.switchContainer}>
                    <AppText style={styles.switchText}>Ready to serve India</AppText>
                    <ToggleSwitch
                    isOn={isSwitchOn == null ? false : isSwitchOn}
                    onColor={colors.orange}
                    size="medium"
                    onToggle={onToggleSwitch}
                    style={styles.switch}
                    disabled={isSwitchOn == null ? true : false}
                    />
                </View>
                <View style={styles.loading}>
                    {request ? 
                        <DetailRide distance={request.distance} area={request.area} rating={request.rating} price={request.price} cancelRide={cancelRide} acceptRide={acceptRide} />
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
    profile: {
        position: 'absolute',
        top: 70,
        right: 10,
        zIndex: 1,
        width: 45,
        height: 45,
        backgroundColor: colors.light,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.white,
        borderWidth: 2,
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