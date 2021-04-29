import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../config/colors'
import AppText from './AppText';

function DetailRide({price, area, distance, rating, cancelRide, acceptRide}) {
    return (
        <View style={styles.container}>
            <View style={styles.information}>
                <AppText style={styles.infoText}>Price</AppText>
                <AppText style={styles.infoTextDetail}>{"Rs "+price}</AppText>
            </View>
            <View style={styles.information}>
                <AppText style={styles.infoText}>Area</AppText>
                <AppText style={styles.infoTextDetail}>{area}</AppText>
            </View>
            <View style={styles.information}>
                <AppText style={styles.infoText}>Distance</AppText>
                <AppText style={styles.infoTextDetail}>{distance}</AppText>
            </View>
            <View style={styles.information}>
                <AppText style={styles.infoText}>Customer Rating</AppText>
                <AppText style={styles.infoTextDetail}>{rating}</AppText>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.danger]} activeOpacity={0.6} onPress={cancelRide}>
                    <AppText style={styles.buttonText}>Cancel</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.accept]} activeOpacity={0.6} onPress={acceptRide}>
                    <AppText style={styles.buttonText}>Accepted </AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    accept: {
        backgroundColor: colors.accept,
    },
    button: {
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonsContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    buttonText: {
        color: colors.white,
    },
    container: {},
    danger: {
        backgroundColor: colors.danger,
    },
    information: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        // justifyContent: 'space-between',
    },
    infoText: {
        width: '70%'
    },
    infoTextDetail: {
        width: '30%',
        textAlign: 'center',
    },
});


export default DetailRide;