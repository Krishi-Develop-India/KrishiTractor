import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import Screen from './../components/Screen';
import AppText from './../components/AppText';
import colors from '../config/colors';
import InputText from '../components/InputText';
import AppButton from '../components/AppButton';
import AuthApi from '../api/authentication';
import LottieView from 'lottie-react-native';
import { Toast } from 'native-base';

function LoginScreen1({navigation}) {

    const [number, setNumber] = useState('');
    const [pressed, setPressed] = useState(false);

    const handleButtonPress = toast => {
        console.log("Toast button pressed");
    }

    const handlePress = async navigation => {
        if(number == '') {
            return Toast.show({
                text: 'Enter your number',
                textStyle: { fontFamily: 'Roboto_medium' },
                buttonText: "OK",
                buttonTextStyle: { color: colors.white, fontFamily: 'Roboto_medium' },
                buttonStyle: { backgroundColor: colors.orange },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        if(number.length != 10) {
            return Toast.show({
                text: 'Number not valid',
                textStyle: { fontFamily: 'Roboto_medium' },
                buttonText: "OK",
                buttonTextStyle: { color: "#008000", fontFamily: 'Roboto_medium' },
                buttonStyle: { backgroundColor: colors.orange },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        setPressed(true);
        const result = await AuthApi.requestOtp(number);
        if(!result.ok){ 
            setPressed(false); 
            return Toast.show({
                text: result.data,
                textStyle: { fontFamily: 'Roboto_medium' },
                buttonText: "OK",
                buttonTextStyle: { color: colors.white, fontFamily: 'Roboto_medium', },
                buttonStyle: {backgroundColor: colors.orange, },
                style: { bottom: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, },
            });
        }
        console.log(result.data || "Nothing");
        navigation.navigate("LoginScreen2", {number, message: result.data || undefined});
    }

    return (
        <Screen style={styles.container}>
            <AppText style={styles.krishi}>Krishi Tractor</AppText>
            <AppText style={styles.disclaimer}>Enter mobile number</AppText>
            <InputText 
            style={styles.input} 
            placeholder="Number" 
            icon="phone" 
            keyboardType="number-pad" 
            onChangeText={ text => setNumber(text) }/>
            <AppButton 
            style={styles.button} 
            text="Next"
            onPress={() => handlePress(navigation)} 
            pressed={pressed}/>
            <LottieView 
                style={styles.animation}
                autoPlay
                source={require('../assets/animations/loading.json')} 
            />
        </Screen>
    );
}


const styles = StyleSheet.create({
    animation: {
        height: 200,
        width: 200,
    },
    button: {
        marginTop: 5,
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    disclaimer: {
        marginTop: 100,
        marginLeft: 10,
    },
    input: {
        marginTop: 15,
    },
    krishi: {
        color: colors.orange,
        fontSize: 50,
        alignSelf: 'center',
        paddingTop: 50,
    },
})


export default LoginScreen1; 