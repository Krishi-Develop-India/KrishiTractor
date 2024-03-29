import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors'

import Screen from './../components/Screen';
import AppText from './../components/AppText';
import LottieView from 'lottie-react-native';

function SplashScreen({setFirstLoad}) {
    return (
        <Screen style={styles.splash}>
            <AppText style={styles.splashKrishi}>Kr</AppText>
            <View style={styles.animate}>
            <LottieView 
                style={styles.animation}
                autoPlay
                loop={false}
                onAnimationFinish={() => setFirstLoad(false)}
                source={require('../assets/animations/loading.json')} 
            />
                <AppText style={styles.splashKrishi}>ı</AppText>
            </View>
            <AppText style={styles.splashKrishi}>sh</AppText>
            <View style={styles.animate}>
                <LottieView style={styles.animation}
                autoPlay
                source={require('../assets/animations/loading.json')} 
                loop={false}
                />
                <AppText style={styles.splashKrishi}>ı</AppText>
            </View>
            <AppText style={styles.initiative}>an agro initiative by case3 Technologies</AppText>
        </Screen>
    );
}


const styles = StyleSheet.create({
    animate: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    animation: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: -4
    },
    initiative: {
      position: 'absolute',
      bottom: 50,
      color: colors.dark,
    },
    splash: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    splashKrishi: {
      color: colors.orange,
      fontSize: 80
    },
});
  


export default SplashScreen;