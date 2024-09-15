/*
Author: Richard Varela
Date Created: 2024-09-07
Purpose: This screen is an all purpose loeading screen. This can be used
anytime the user has to wait, especially when the app has to communicate
with the backend.
*/

import React from 'react';

import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    View,
    Text
 } from 'react-native';

import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import {RootStackParamList} from '../App';
import Navigation from '../Components/Navigation';

const {width, height} = Dimensions.get('window');
const LoadingScreen = () => {
    const navigation = useNavigation<any>();

    const handleContinue = () => {
        console.log('Continued was hit, now waiting to simulate network traffic for 5 seconds.')
        setTimeout(()=> {
            console.log("done");
            navigation.navigate('Main');
        }, 5000);
    }

    useFocusEffect(handleContinue)

    return (
        <View style={styles.background_style}>
            {/* This container represents the M logo. */}
            <View style={logo.rectangle}>
                <Text style={logo.m_logo}>M</Text>
            </View>

            {/* This container contains the loading circle animation. */}
            <View style={styles.body}>
                <View style={styles.loading_area}>
                    {/* This React Native element represents the loading circle. `transform` scales the animation. */}
                    <ActivityIndicator size='large' color='white' style={{transform: [{scaleX: 4}, {scaleY: 4}]}}/>
                </View>
                
                <View style={styles.text_area}>
                    <Text style={{color: 'white', fontSize: 36}}>Please Wait</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    background_style: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#0EA68D',
        justifyContent: 'center',
        height: height * 0.95
    },
    body: {
        display: 'flex',
        width: '100%',
        height: height * 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'red'
    },
    loading_area: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        justifyContent: 'center',
        height: 0.8,
        // backgroundColor: 'blue'
    },
    text_area: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'purple'
    }
});

// Creates the M logo
const logo = StyleSheet.create({
    logo_box: {
      width: 400,
      height: 200,
      alignItems: 'center',
      backgroundColor: 'purple'
    },
    m_logo: {
      fontSize: 80,
      color: '#0EA68D',
      backgroundColor: 'white',
      fontWeight: 'bold',
    },
    rectangle: {
      width: 120,
      height: 120,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LoadingScreen;